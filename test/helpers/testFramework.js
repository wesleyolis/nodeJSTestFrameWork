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

    if (!mockData || !(!mockData.auxParams && mockData.returns)) {
      serviceMock.reset();
    }

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


      // stub = stub.throws('Test Configuration, called a mock with unknown arguments');

      // if (mockData.auxParams) {
      //   throw new Error(`Malformed test configuration, '${mockDataDepKey}.${module}.${key}.auxParams' doesn't exist in module:${JSON.stringify(mockData)}`);
      // }

      const params = mockData.auxParams ? [...mockData.auxParams] : [];

      if (mockData.throws === undefined && mockData.returns === undefined) {
        throw new Error('Test Configuration Missing throws or returns, can\'t be undefined');
      }

      const stub = sinon.stub();

      if (!mockData.auxParams && mockData.returns) {
        serviceMocks[key] = mockData.returns;

        //sinon.stub(serviceMocks, key).get(() => mockData.returns);
        return;
      }

      stub.callsFake(function () {
        unExpectedError.error = `Error: Test Configuration, called a mock with additional arguments, expected: (${params.length})${JSON.stringify(params)}=${JSON.stringify(arguments)}`;
        console.error('Error: Test Configuration, called a mock with unknown arguments');
        throw new Error(unExpectedError.error);
      });

      // the withArgs and throws on oneline it is much safer.
      if (mockData.throws !== undefined) {
        stub.withArgs(... params).throws(mockData.throws);
      } else if (mockData.returns !== undefined) {
        stub.withArgs(... params).returns(mockData.returns);
      }


      serviceMock.callsFake(function (...args) {

        const remaningParams = calledWithConventionalParamsElseThrow(mockDataDepKey, key, { req }, args, unExpectedError);

        // There is no exact
        if (remaningParams.length === params.length) {
          return stub(...remaningParams);
        }

        unExpectedError.error = `Error: Test Configuration, called a mock with additional arguments, expected: (${params.length})${JSON.stringify(params)}=${JSON.stringify(remaningParams)}`;
        throw new Error(unExpectedError.error);
      });
    }
  });
}

function createTestFrameWork(frameworkConfig, moduleShapeConfig) {

  let prevConfig = null;
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

  const moduleWithEnvInstance = function (mockData) {

    // Dynamically load the module mocks.
    const mockDataDeps = mockData[moduleShapeConfig.depsModuleMockKey];

    if (!mockDataDeps) {
      throw new Error(`MockData depedent modules configuration key not found, '${moduleShapeConfig.depsModuleMockKey}'`);
    }

    const configStr = JSON.stringify(mockData.env.config);

    moduleShapeConfig.moduleMocksReset();

    if (prevConfig !== configStr || !currentMockController) {

      prevConfig = configStr;

      for (const key in mockDataDeps) {
        const modulePath = moduleShapeConfig.moduleDepsPath + key + (moduleShapeConfig.modulePathSuffix ? moduleShapeConfig.modulePathSuffix : '');

        const moduleMockPath = moduleShapeConfig.moduleDepsRequirePath + key + (moduleShapeConfig.modulePathSuffix ? moduleShapeConfig.modulePathSuffix : '');

        const moduleLoaded = require(modulePath);

        const moduleStubs = {};

        const moduleExports = Object.keys(moduleLoaded);

        // eslint-disable-next-line no-loop-func
        moduleExports.forEach((func) => {
          moduleStubs[func] = sinon.stub();
        });

        moduleMocks[moduleMockPath] = moduleStubs;
        depModuleStubs[key] = moduleMocks[moduleMockPath];
      }

      if (mockData.env.config) {
        loadConfigOverides(configModuleMock, mockData.env.config);
      } else {
        throw new Error('mockData.env.config is missing');
      }

      previousClients = mockData.clients;

      currentMockController = proxyquire.noCallThru().load(frameworkConfig.module, moduleMocks);
    } else if (previousClients) {
      // reset all previous stubs..

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

    const runTestCases = async function (funcKey, mockDataCases) {

      const testCases = Object.keys(mockDataCases);

      testCases.forEach((testCase) => {

        const mockData = mockDataCases[testCase];

        const harnus = async function () {
          await moduleShapeConfig.testRunnerAsync(funcKey, mockData, moduleWithEnvInstance);
        };

        if (testCase === pauseOnTestKey) {
          it.only(mockData.title || testCase, harnus);
        } else if (!pauseOnTestKey) {
          it(mockData.title || testCase, harnus);
        }
      });
    };

    if (frameworkConfig.testModuleFuncName) {
      describe(`Function Test Cases: ${frameworkConfig.describe || frameworkConfig.testModuleFuncName}`, async function () {
        await runTestCases(frameworkConfig.testModuleFuncName, frameworkConfig.mockData);
      });
    } else {
      const testFunctionsKeys = Object.keys(frameworkConfig.mockData).filter((k) => k !== 'default');

      testFunctionsKeys.forEach((funcKey) => {

        const mockFuncData = frameworkConfig.mockData[funcKey];

        describe(`Function Test Cases: ${mockFuncData.describe || funcKey}`, async function () {
          await runTestCases(funcKey, mockFuncData);
        });
      });
    }
  };
}


module.exports = { createTestFrameWork };
