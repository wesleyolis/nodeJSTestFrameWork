import { createTestFrameWork } from '../helpers/controllerHelper';

import * as dataMocks from '../mocks/redirectAuthController-mocks';

describe('RedirectAuthController', function () {

  describe('Client Wrapper - GetProfileSubscriptionOfTypeDigitalWallet', async () => {

    const frameworkConfig = {
      module: '../../src/controllers/redirectAuthController.js',
      describe: 'Testing Redirect Auth Controller',
      mockData: dataMocks.redirectAuthControllerDataMocks
    };

    const testFrameWorkInstance = createTestFrameWork(frameworkConfig);

    await testFrameWorkInstance();
  });
});

