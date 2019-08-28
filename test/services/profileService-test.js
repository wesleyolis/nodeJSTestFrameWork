import { createTestFrameWork } from '../helpers/serviceClientHelper';

import * as dataMocks from '../mocks/profileService-mocks';

describe('Profile Service', function () {

  describe('Client Wrapper - GetProfileSubscriptionOfTypeDigitalWallet', async () => {

    const frameworkConfig = {
      module: '../../src/services/profileService.js',
      testModuleFuncName: 'getProfileSubscriptionOfTypeDigitalWallet',
      describe: 'Testing Profile Subscription Of Type Digital Wallet',
      mockData: dataMocks.getProfileSubscriptionOfTypeDigitalWallet
    };

    const testFrameWorkInstance = createTestFrameWork(frameworkConfig);

    await testFrameWorkInstance();
  });

  describe('Client Wrapper - getProfileSubscriptionOfTypeMSISDN', async () => {

    const frameworkConfig = {
      module: '../../src/services/profileService.js',
      testModuleFuncName: 'getProfileSubscriptionOfTypeMSISDN',
      describe: 'Testing Profile Subscription Of Type MSISDN',
      mockData: dataMocks.getProfileSubscriptionOfTypeMSISDN
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

