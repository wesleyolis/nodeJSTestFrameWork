import { createTestFrameWork } from '../helpers/servicesHelper';

import * as dataMocks from '../mocks/authService-mocks';

describe('Auth Service', async function () {

  const frameworkConfig = {
    module: '../../src/services/authService.js',
    mockData: dataMocks
  };

  const testFrameWorkInstance = createTestFrameWork(frameworkConfig);

  await testFrameWorkInstance();
});

