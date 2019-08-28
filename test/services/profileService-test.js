import { createTestFrameWork } from '../helpers/serviceClientHelper';

import * as dataMocks from '../mocks/profileService-mocks';

describe('Profile Service', function () {

  describe('Client Wrapper - GetProfileSubscriptionOfType', async () => {

    const frameworkConfig = {
      module: '../../src/services/profileService.js',
      testModuleFuncName: 'getProfileSubscriptionOfType',
      describe: 'Testing Profile Subscription Of Type Digital Wallet',
      mockData: dataMocks.getProfileSubscriptionOfType
    };

    const testFrameWorkInstance = createTestFrameWork(frameworkConfig);

    await testFrameWorkInstance();
  });

  describe('Bulk Configuration Run', async () => {

    const frameworkConfig = {
      module: '../../src/services/profileService.js',
      mockData: dataMocks
    };

    const testFrameWorkInstance = createTestFrameWork(frameworkConfig);

    await testFrameWorkInstance();
  });
});

