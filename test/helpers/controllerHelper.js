import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import httpMocks from 'node-mocks-http';
import * as testFramework from './testFramework';

chai.use(sinonChai);

const expect = chai.expect;
const assert = chai.assert;


function createResponse() {
  const res = httpMocks.createResponse();

  res.redirect = function (status, endpoint, next) {
    res.statusCode = status;
    res._redirectUrl = endpoint;
    next();
  };

  return res;
}

function moduleConfigShapeForControllerServies() {

  const loggerMock = {
    error: sinon.stub()
  };

  return {
    moduleMocks: {
      loggerMock
    },
    moduleMocksReset: function () {
      loggerMock.error.reset();
    },
    moduleMocksTest: function () {

    },
    moduleDepsPath: '../../src/services/',
    moduleDepsRequirePath: '../services/',
    modulePathSuffix: 'Service',
    depsModuleMockKey: 'services',
    calledWithConventionalParamsElseThrow: function (mockDataDepKey, key, context, calledArgs, unExpectedError) {
      if (context.req !== calledArgs[0]) {
        unExpectedError.error = `Controller called a ${mockDataDepKey} function: ${key} with different request parameter`;
        console.error(`Controller called a ${mockDataDepKey} function: ${key} with different request parameter`);
        throw new Error(`Controller called a ${mockDataDepKey} function: ${key} with different request parameter`);

      }
      if (context.req.headers !== calledArgs[1]) {
        unExpectedError.error = `Controller called a ${mockDataDepKey} function: ${key} with different req.headers parameter`;
        console.error(`Controller called a ${mockDataDepKey} function: ${key} with different req.headers parameter`);
        throw new Error(`Controller called a ${mockDataDepKey} function: ${key} with different req.headers parameter`);
      }

      return calledArgs.slice(2);
    },
    testRunnerAsync: async function (funcKey, mockData, moduleWithEnvInstance) {

      const { mockController, req, postTest, depThrows, execError } = moduleWithEnvInstance(mockData);

      req.log = loggerMock;

      const res = createResponse();

      const func = mockController[funcKey];

      if (!func) { throw new Error(`'${funcKey}' not found in deps modules`); }

      if (typeof func === 'function') {

        const next = sinon.spy();

        try {
          await func(req, res, next);
        } catch (err) {
          expect(execError.error).to.be.eq(undefined, 'The error that you are looking for has been throw and swalled some where.');
          assert(false, 'The controller should have a try catch, that is handling everything.');
        }

        expect(execError.error).to.be.eq(undefined, 'The error that you are looking for has been throw and swalled some where.');

        expect(next.callCount).to.eq(1);

        let shouldHaveLoggedAThrow = depThrows;

        if (mockData.response) {
          if (mockData.response.status >= 400) {
            shouldHaveLoggedAThrow = true;
          }
        } else {
          assert(false, 'MockData.response is missing');
        }

        expect(loggerMock.error.callCount).to.eq(shouldHaveLoggedAThrow ? 1 : 0);

        expect(res._getStatusCode()).to.equal(mockData.response.status);

        if (mockData.response.data) {
          const data = res._getJSONData();

          expect(data).to.deep.equal(mockData.response.data);
        } else if (res.data) {
          assert(data === undefined, 'Repsonse, shouldn\'t have returned any data.');
        }

        const headers = mockData.response.headers;

        if (mockData.response.headers) {
          const headerKeys = Object.keys(headers);

          headerKeys.forEach((headerKey) => {
            const mockDataValue = headers[headerKey];

            let headerValue = res.getHeader(headerKey);

            if (headerKey === 'location') {
              headerValue = res._redirectUrl;
            }

            expect(mockDataValue).to.equal(headerValue, `Header:${headerKey}=${mockDataValue}!=${headerValue}`);
          });
        }

        await postTest();
      } else {
        // Loading of constants.
        const result = await func;

        expect(execError.error).to.eq(undefined, 'The error that you are looking for has been throw and swalled some where.');

        if (mockData.result) {
          expect(result).to.deep.eq(mockData.result);
        }
      }
    }
  };
}

function createTestFrameWork(frameworkConfig) {

  frameworkConfig.testModuleFuncName = 'handler';
  return testFramework.createTestFrameWork(frameworkConfig, moduleConfigShapeForControllerServies());
}

module.exports = { createTestFrameWork };
