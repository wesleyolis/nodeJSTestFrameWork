import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import * as testFramework from './testFramework';

chai.use(sinonChai);

const expect = chai.expect;
const assert = chai.assert;

function moduleConfigShapeForServicesClients() {

  const wsLoggerMock = {
    startMsg: sinon.spy(),
    errMsg: sinon.spy(),
    endMsg: sinon.spy()
  };

  const utilsModuleMock = {
    WsLogger: function () {
      return wsLoggerMock;
    },
    '@noCallThru': true
  };

  return {
    moduleMocks: {
      'vod-npm-utils': utilsModuleMock
    },
    moduleMocksReset: function () {
      wsLoggerMock.startMsg.resetHistory();
      wsLoggerMock.errMsg.resetHistory();
      wsLoggerMock.endMsg.resetHistory();
    },
    moduleMocksTest: function () {

      // Can enhance this to ensure that it is called with req, and another parameter..
      // else throw and error..
      expect(wsLoggerMock.startMsg.callCount).eql(1, 'Should have called, WsLogger.startMsg');

      expect(wsLoggerMock.errMsg.callCount === 1 || wsLoggerMock.endMsg.callCount === 1, 'Should have called, WsLogger.errMsg or endMsg');
    },
    moduleDepsPath: '../../src/clients/',
    moduleDepsRequirePath: '../clients/',
    depsModuleMockKey: 'clients',
    calledWithConventionalParamsElseThrow: function (mockDataDepKey, key, context, calledArgs, unExpectedError) {
      if (context.req.headers !== calledArgs[0]) {
        unExpectedError.error = `Controller called a ${mockDataDepKey} function: ${key} with different req.headers parameter`;
        console.error(`Controller called a ${mockDataDepKey} function: ${key} with different req.headers parameter`);
        throw new Error(`Controller called a ${mockDataDepKey} function: ${key} with different req.headers parameter`);
      }

      return calledArgs.slice(1);
    },
    testRunnerAsync: async function (funcKey, mockData, moduleWithEnvInstance) {

      const { mockController, req, postTest, execError } = moduleWithEnvInstance(mockData);

      const args = [req, req.headers, ...mockData.auxParams];

      try {
        const func = mockController[funcKey];

        if (!func) { throw new Error(`'${funcKey}' not found in deps modules`); }

        const result = await func(... args);

        expect(execError).to.eq(undefined, 'The error that you are looking for has been throw and swalled some where.');

        if (mockData.result) {
          expect(result).to.deep.eq(mockData.result);
        }

      } catch (err) {
        if (mockData.result) {
          throw err;
        }

        if (mockData.throws) {
          expect(err.name).to.deep.eq(mockData.throws);
        } else {
          throw new Error('test case has results defined, .result or .throws is undefined');
        }
      }

      postTest();
    }
  };
}

function createTestFrameWork(frameworkConfig) {

  return testFramework.createTestFrameWork(frameworkConfig, moduleConfigShapeForServicesClients());
}

module.exports = { createTestFrameWork };
