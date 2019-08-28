import sinon from 'sinon';
import proxyquire from 'proxyquire';
import config from 'config';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import httpMocks from 'node-mocks-http';
import { json } from 'mocha/lib/reporters';

chai.use(sinonChai);

const expect = chai.expect;
const assert = chai.assert;

function loadConfigOverides(configMock, conf) {

  configMock.get = function (path) {
    if (conf.hasOwnProperty(path)) {
      return conf[path];
    }

    //   if (config.has(path)) {
    //     return config.get(path);
    //   }
    console.log(`Key not found for path: ${path}`);
    throw Error(`Key not found for path: ${path}`);
  };
}

function loadDepConfig(mockDepConfig) {

  const depsModuleRefMap = {};

  const modulesKeys = Object.keys(mockDepConfig);

  modulesKeys.forEach((moduleKey) => {
    const mod = mockDepConfig[moduleKey];

    const mocks = require(mod.path);

    const mockFuncKeys = Object.keys(mocks);

    const funcsNotFound = mod.funcs.filter((f) => {
      return mockFuncKeys.includes(f);
    });

    if (funcsNotFound.length) {
      throw new Error(`Error loading deps function ref'${funcsNotFound[0]}' not found in mocksPath:${mod.path}`);
    }

    const moduleFuncMocks = {};

    const loadMockFuncKeys = Object.keys(mod.funcs);

    loadMockFuncKeys.forEach((funcKey) => {

      const funcMocks = mocks[funcKey];

      let tests = funcMocks.units;

      if (!tests) {
        tests = funcMocks.inter;
      }

      if (!tests) {
        tests = funcMocks.func;
      }

      const throws = funcMocks.throws;

      if (funcMocks.fileThrows) {
        // This will probably require a resolve, because the
        // path is relative to the base test.
        const throwCases = require(funcMocks.fileThrows);

        if (throwCases) {
          Object.entries(throwCases).forEach(([key, value]) => {

            if (value.throws) {

              if (throws[key]) {
                throw new Error(`duplicate name test in ${moduleKey}.${funcKey}`);
              }

              throws[key] = value.throws;
            }
          });
        }
      }

      Object.entries(test).forEach(([key, value]) => {

        if (value.throws) {

          if (throws[key]) {
            throw new Error(`duplicate name test in ${moduleKey}.${funcKey}`);
          }

          throws[key] = value.throws;
        }
      });

      moduleFuncMocks[funcKey] = {
        throws: funcMocks.throws,
        unit: tests
      };

      depsModuleRefMap[moduleKey] = moduleFuncMocks;
    });
  });

  return depsModuleRefMap;
}

function loadDepsConfig(mockDepsConfig, depsConfig) {

  const depsModulesRefMap = {};

  const moduleCateKeys = Object.keys(depsConfig.modulesCateKeys);

  moduleCateKeys.forEach((key) => {

    const depModulesConfig = mockDepsConfig[key];

    const depsModuleRefMap = loadDepConfig(depModulesConfig);

    depsModulesRefMap[key] = depsModuleRefMap;
  });
}

// Look at mabye implementing this as modification to proxify,
// which allows exporting of module config from deps, that can be customized.
function proxyquireRecusive(module, scopeModules, modules) {

  const depLevel2Modules = {};

  const modulesKeys = Object.keys(modules);

  modulesKeys.forEach((key) => {

    const depsModule = modules[key];

    const depLevel2StubOveride = Object.assign(modules, scopeModules);

    const proxied = proxyquire.load(key, depLevel2StubOveride);

    const depKeys = Object.keys(depsModule);

    depKeys.forEach((k) => {
      if (k !== '@noCallThru' && k !== '@global') {
        proxied[k] = depsModule[k];
      }
    });

    depLevel2Modules[key] = proxied;
  });

  const depStubOveride = Object.assign(depLevel2Modules, scopeModules);

  const proxiedModule = proxyquire(module, depStubOveride);

  return proxiedModule;
}

function itemsEqual(itemA, itemB) {
  // first do the type check and the all the comparisons.
}

function validateAndExecute(execError, params, matches, invalidMatch) {

  return function () {
    const numArgs = arguments.length;

    const itLimit = numArgs;
    // need the max

    let i = 0;

    for (; i < numArgs; i++) {
      if (!itemsEqual(arguments[i], params[i])) { break; }
    }

    if (i === numArgs) {
      return matches();
    }

    return invalidMatch();
  };
}

function loadDepsModuleFuncTestData(options) {
  const {
    logIdentity,
    moduleShapeConfig,
    execError,
    mockData,
    funcRefMap,
    testInstanceContext: {
      req
    }
  } = options;

  if (!mockData) {
    return function () {
      execError.error = `Error: Malformed test configuration, '${logIdentity}' is missing`;
    };
  }

  if (mockData.neverReached) {
    return function () {
      execError.error = `Error: '${logIdentity}' function should never have been reached.:${JSON.stringify(arguments)}`;
    };
  } else if (mockData.neverCalled) {
    return function () {
      execError.error = `Error: '${logIdentity}' function should never have been called::${JSON.stringify(arguments)}`;
    };
  }

  if (mockData.throws === undefined && mockData.returns === undefined) {
    throw new Error(`Test Configuration '${logIdentity}' Missing throws or returns, can\'t be undefined`);
  }

  return function (...args) {

    const remaningParams = calledWithConventionalParamsElseThrow(mockDataDepKey, key, { req }, args, unExpectedError);

    const params = mockData.auxParams ? [...mockData.auxParams] : [];

    // the withArgs and throws on oneline it is much safer.
    if (mockData.throws !== undefined) {
      return validateAndExecute(execError, params, () => { throw new Error(mockData.throws); });
    } else if (mockData.returns !== undefined) {
      return validateAndExecute(execError, params, () => { return mockData.returns; });
    }
  };
}

function loadMockService(mockDataDepKey, module, req, serviceMocks, servicesMockData, calledWithConventionalParamsElseThrow, unExpectedError) {

  const keys = Object.keys(servicesMockData);
  const serviceKeys = Object.keys(serviceMocks);

  serviceKeys.forEach((sKey) => {
    if (!servicesMockData[sKey]) {
      keys.push(sKey);
    }
  });

  keys.forEach((key) => {

    const serviceMock = serviceMocks[key];
    const mockData = servicesMockData[key];

    if (!serviceMock) {
      throw new Error(`Malformed test configuration, '${mockDataDepKey}.${module}.${key}' doesn't exist in module:${JSON.stringify(servicesMockData)}`);
    }

    serviceMock.reset();

    if (!mockData) {
      serviceMock.callsFake(function () {
        unExpectedError.error = `Error: Malformed test configuration, '${mockDataDepKey}.${module}.${key}' is missing`;
        console.error(`Error: Malformed test configuration, '${mockDataDepKey}.${module}.${key}' is missing`);
        throw new Error(`Malformed test configuration, '${mockDataDepKey}.${module}.${key}' is missing`);
      });
      return;
    }

    if (mockData.neverReached) {
      serviceMock.callsFake(function () {
        unExpectedError.error = `Error: Test Configuration, this function should never have been reached.:${JSON.stringify(arguments)}`;
        console.error('Error: Test Configuration, this function should never have been reached.');
        throw new Error('Test Configuration, this function should never have been reached.');
      });
    } else if (mockData.neverCalled) {
      serviceMock.callsFake(function () {
        unExpectedError.error = `Error: Test Configuration, this function should never have been called::${JSON.stringify(arguments)}`;
        console.error('Error: Test Configuration, this function should never have been called.');
        throw new Error('Test Configuration, this function should never have been called.');
      });
    } else {

      const stub = sinon.stub();

      // stub = stub.throws('Test Configuration, called a mock with unknown arguments');

      // if (mockData.auxParams) {
      //   throw new Error(`Malformed test configuration, '${mockDataDepKey}.${module}.${key}.auxParams' doesn't exist in module:${JSON.stringify(mockData)}`);
      // }

      const params = mockData.auxParams ? [...mockData.auxParams] : [];

      if (mockData.throws === undefined && mockData.returns === undefined) {
        throw new Error('Test Configuration Missing throws or returns, can\'t be undefined');
      }

      stub.callsFake(function () {
        unExpectedError.error = `Error: Test Configuration, called a mock with unknown arguments:${JSON.stringify(arguments)}`;
        console.error('Error: Test Configuration, called a mock with unknown arguments');
        throw new Error('Test Configuration, called a mock with unknown arguments');
      });

      // the withArgs and throws on oneline it is much safer.
      if (mockData.throws !== undefined) {
        stub.withArgs(... params).throws(mockData.throws);
      } else if (mockData.returns !== undefined) {
        stub.withArgs(... params).returns(mockData.returns);
      }


      serviceMock.callsFake(function (...args) {
        const remaningParams = calledWithConventionalParamsElseThrow(mockDataDepKey, key, { req }, args, unExpectedError);

        return stub(...remaningParams);
      });
    }
  });
}

function mockDataFromFuncData(funcMockData) {
  let mockData = funcMockData.units;

  if (!mockData) {
    mockData = funcMockData.inter;
  }
  if (!mockData) {
    mockData = funcMockData.func;
  }

  return mockData;
}

function createTestFrameWork(frameworkConfig, moduleShapeConfig) {

  const prevConfig = null;
  let previousClients = null;
  let currentMockController = null;

  let moduleMocks = {};

  const depModuleStubs = {};

  // Defaultly mock the config and
  const configModuleMock = {
    get: undefined,
    '@noCallThru': true
  };
  // This out lives the envConfigModuleMock

  moduleMocks = Object.assign({
    config: configModuleMock
  }, moduleShapeConfig.moduleMocks);

  const moduleWithEnvInstance = function (funcMockData, depsModulesRefMap) {

    // Dynamically load the module mocks, this is now more complex.
    // const mockDataDeps = mockData[moduleShapeConfig.depsModuleMockKey];

    // if (!mockDataDeps) {
    //   throw new Error(`MockData depedent modules configuration key not found, '${moduleShapeConfig.depsModuleMockKey}'`);
    // }

    const configStr = JSON.stringify(funcMockData.env.config);

    // moduleShapeConfig.moduleMocksReset();

    if (prevConfig !== configStr || !currentMockController) {

    //   prevConfig = configStr;

    //   for (const key in mockDataDeps) {
    //     const modulePath = moduleShapeConfig.moduleDepsPath + key + (moduleShapeConfig.modulePathSuffix ? moduleShapeConfig.modulePathSuffix : '');

    //     const moduleMockPath = moduleShapeConfig.moduleDepsRequirePath + key + (moduleShapeConfig.modulePathSuffix ? moduleShapeConfig.modulePathSuffix : '');

    //     const moduleLoaded = require(modulePath);

    //     const moduleStubs = {};

    //     const moduleExports = Object.keys(moduleLoaded);

    //     // eslint-disable-next-line no-loop-func
    //     moduleExports.forEach((func) => {
    //       moduleStubs[func] = sinon.stub();
    //     });

    //     moduleMocks[moduleMockPath] = moduleStubs;
    //     depModuleStubs[key] = moduleMocks[moduleMockPath];
    //   }

      if (mockData.env.config) {
        loadConfigOverides(configModuleMock, mockData.env.config);
      } else {
        throw new Error('mockData.env.config is missing');
      }

      previousClients = mockData.clients;

      currentMockController = proxyquire.noCallThru().load(frameworkConfig.module, moduleMocks);
    } else if (previousClients) {
      // reset all previous stubs..
      // this we should only need to do for like shpare configuration now,
      // as we just going to load our own configuration.

      const clientKeys = Object.keys(previousClients);

      clientKeys.forEach((clientKey) => {

        const clientModule = previousClients[clientKey];
        const clientModuleMock = depModuleStubs[clientKey];

        const mocksKeys = Object.keys(clientModule);

        mocksKeys.forEach((mockKey) => {
          const mock = clientModuleMock[mockKey];

          mock.reset();
        });
      });
    }

    const req = httpMocks.createRequest(mockData.request);

    req.headers = req.headers || {};

    let depThrows = false;

    // This is here to detect throwing of an error, for incorrect configuration or mistake,
    // that has reached a function, that it shouldn't have that is throwing and error.
    // The error that is throw in the test can be swallowed and change to 428 or anything else
    // and still un intentionally cause the test to fail.
    const execError = {
      error: undefined
    };

    {
      const depModuleMockFunc = {};

      const moduleCateKeys = Object.keys(moduleShapeConfig.modulesCateKeys);

      // Load the mock test data, this could be done aftewards with out a mock
      moduleCateKeys.forEach((cateKey) => {

        const mockModules = funcMockData[cateKey];
        const modulesRefMap = depsModulesRefMap[cateKey];

        Object.entries(mockModules).forEach(([moduleKey, mockModule]) => {

          const moduleMockFunc = {};

          const moduleRefMap = modulesRefMap[moduleKey];

          // Required to load the module to determine the exported functions.
          const modulePath = moduleShapeConfig.moduleDepsPath + moduleKey + (moduleShapeConfig.modulePathSuffix ? moduleShapeConfig.modulePathSuffix : '');

          const moduleMockPath = moduleShapeConfig.moduleDepsRequirePath + moduleKey + (moduleShapeConfig.modulePathSuffix ? moduleShapeConfig.modulePathSuffix : '');

          const moduleLoaded = require(modulePath);

          const moduleExports = Object.keys(moduleLoaded);

          const moduleExportKeys = Object.keys(moduleExports);

          const funcKeys = Object.keys(moduleExportKeys);

          const allModuleKeys = Object.assign(moduleExportKeys, funcKeys);


          allModuleKeys.forEach((funcKey) => {

            const logIdentity = `${cateKey}.${moduleKey}.${funcKey}`;

            if (moduleExports[funcKey] === undefined) {
              throw new Error(`Malformed test configuration, '${logIdentity}' is not found in loaded module`);
            }

            const mockData = mockModule[funcKey];
            const funcRefMap = moduleRefMap[funcKey];

            const options = {
              logIdentity,
              moduleShapeConfig,
              execError,
              mockData,
              funcRefMap,
              testInstanceContext: {
                req
              }
            };

            const mockFunc = loadDepsModuleFuncTestData(options);

            moduleMockFunc[funcKey] = mockFunc;
          });

          depModuleMockFunc[moduleKey] = moduleMockFunc;
        });
      });

      // still required to reload the enviromental configuration..
      currentMockController = proxyquire.noCallThru().load(frameworkConfig.module, moduleMocks);

      funcMockData;


      if (funcMocks.units) {

      }
      if (funcMocks.inter) {

      }
      if (funcMocks.func) {

      }

      function loadTest(mockData) {

      }

      mockData.units; // test could be anyone of these.
      mockData.inter; // the test could be anyone of these
      mockData.func; // the test could be any one of theses
      mockData.throws; // for each dependancies I expect a test..
      mockData.fileThrows; // for each dependance I expect a test..


      moduleCateKeys.forEach((cateKey) => {
        const modules = mockData[cateKey];

        const moduleKeys = Object.keys(modules);

        /*
inter: {}, // depsConfig Loading.., no mock of deps, on config of deps..
    func: {}, // env only, no mock of deps or depsConfig
    units: { //env, mockdeps
      testCase: {
        title: '',
        type: 'unit', 'func', 'inter'
        whoIsDependentOnThisTest: '../../src/services/transmartServiceauthService#supplierId',
        env: {
          config: {

          }
        },
        request: {},
        auxParams: [],
        deps: {
          module: {
            function: 'throws.testCase', // Narrow the test case..
            functioB: ['unit.testA', 'unit.testB']
          },
          module2: {
            function: 'rangeThrows.TestA',
            functionC: ['throws.A', 'throws.B'] // run thought everything..
          },
          module3: {
            func: {
              auxParams: [],
              throws: '',
              returns: '',
              neverReached: true, // This basically helps lock down the shape of the deps.
              neverCalled: true // This basically also ensures the shape and order of operations is maintained.
              // Here we may want ordinal, if we want to ensure spesific major ordering.
            }
          }
        },
        params: [],
        request: {},
        throws: {}, // Can just index these functions at the end of the day, by default when called, will tought..
        // this means that in test driven design, that, we shall with out writting any throw test, that
        // we be checking the error handling from the start.. With out having to write all the tests,
        // until we need to cover more.
        // Basically we can do a check for an array.
        response: {}
      },
      testCase2: {
        deps: {
          module: {
            function: 'throws.testCaseA'
          }
        }
      },
      testCase3: {}
    },
    throws: {
      testCase: {},
      testCase2: {},
      testCase3: {}
    },
    fileThrows:
        */

      });
    }

    {
      const mockClientsData = mockDataDeps;

      const clientDataKeys = Object.keys(mockClientsData);

      clientDataKeys.forEach((clientDataKey) => {

        const clientData = mockClientsData[clientDataKey];
        const clientMock = depModuleStubs[clientDataKey];

        loadMockService(moduleShapeConfig.depsModuleMockKey, clientDataKey, req, clientMock, clientData, moduleShapeConfig.calledWithConventionalParamsElseThrow, execError);

        const keys = Object.keys(clientData);

        keys.forEach((k) => {
          const data = clientData[k];

          depThrows |= (data.throws !== undefined);
        });
      });
    }

    const postTest = async function () {

      moduleShapeConfig.moduleMocksTest();
    };

    return { mockController: currentMockController, req, postTest: postTest, clientStubs: depModuleStubs, depThrows, execError: execError };
  };

  return async function (pauseOnTestKey = undefined) {

    const runFuncTestCases = async function (funcKey, mockDataCases) {

      // Load the dependent modules func mocks..
      const depsModulesRefMap = loadDepsConfig(mockDataCases, moduleShapeConfig.depsModuleMockKey);

      // Required to generate test cases that are required to be furfilled, by current test definitions.
      const depModulesRefMapHasTestCase = {};

      // Get the deps test.
      let testCases = mockDataCases.units;

      if (!testCases) {
        testCases = mockDataCases.inter;
      }
      if (!testCases) {
        testCases = mockDataCases.func;
      }

      testCases.forEach((testCase) => {

        const mockData = mockDataCases[testCase];

        const harnus = async function () {

          await moduleShapeConfig.testRunnerAsync(funcKey, mockData, moduleWithEnvInstance, depsModulesRefMap);
        };

        if (testCase === pauseOnTestKey) {
          it.only(mockData.title || testCase, harnus);
        } else if (!pauseOnTestKey) {
          it(mockData.title || testCase, harnus);
        }
      });

      describe('Unfurfilled dependent test cases', function () {
        Object.entries(depModulesRefMapHasTestCase).forEach(([cateKey, modules]) => {
          Object.entries(modules).forEach(([moduleKey, funcs]) => {
            funcs.forEach((func) => {
              it(`Deps: ${cateKey}.${moduleKey}.${func}`, function () {
                // what we can do is load a test here, with defaultErrorHandler.
                // Then there is also pass tought error handling..
                // what we can do is have like expectation of how this error should be handled.
                // lookinto this later..
                assert(false, 'Expect a test case, ensuring this deps test is handled.');
              });
            });
          });
        });
      });
      // Generate test case for throw that have not been furfilled yet, mabye they passout of luck

    };

    if (frameworkConfig.testModuleFuncName) {
      describe(`Function Test Cases: ${frameworkConfig.describe || frameworkConfig.testModuleFuncName}`, async function () {
        await runFuncTestCases(frameworkConfig.testModuleFuncName, frameworkConfig.mockData);
      });
    } else {
      const testFunctionsKeys = Object.keys(frameworkConfig.mockData).filter((k) => k !== 'default');

      testFunctionsKeys.forEach((funcKey) => {

        const mockFuncData = frameworkConfig.mockData[funcKey];

        describe(`Function Test Cases: ${mockFuncData.describe || funcKey}`, async function () {
          await runFuncTestCases(funcKey, mockFuncData);
        });
      });
    }
  };
}


module.exports = { createTestFrameWork };
