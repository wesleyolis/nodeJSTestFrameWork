import { createTestFrameWork } from '../helpers/servicesHelper';

import * as dataMocks from '../mocks/transmartService-mocks';

describe('Transmart Service', async function () {

  const frameworkConfig = {
    module: '../../src/services/transmartService.js',
    testModuleFuncName: 'supplierId',
    describe: 'SupplierId cases revealing input to output result and throws of encapsulated functionality',
    mockData: dataMocks.supplierId
  };

  const testFrameWorkInstance = createTestFrameWork(frameworkConfig);

  await testFrameWorkInstance();
});

