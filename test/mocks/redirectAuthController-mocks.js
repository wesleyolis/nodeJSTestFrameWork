exports.redirectAuthControllerDataMocks = {
  sucessfullRedirectWithToken: {
    title: 'Sucessfully redirect with token, were all inputs were wellformed.',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount1',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['ZATestAccount1', 5],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId1'
          },
          throws: undefined
        }
      },
      transmart: {
        supplierId: {
          auxParams: ['ZATestAccount1'],
          returns: 'supplierIdForTestAccount1'
        }
      },
      auth: {
        generateAuthToken: {
          auxParams: ['WalletAuthSubcriptionIdentifierId1', 'supplierIdForTestAccount1'],
          returns: 'WalletAuthTokenId1',
          throws: undefined
        }
      }
    },
    response: {
      status: 302,
      headers: {
        location: 'TestRedirectParameter?MerchantIdentifier=TestMerchantIdParameter&WalletToken=WalletAuthTokenId1'
      }
    }
  },
  generateAuthTokenFails401: {
    title: 'Generation of Auth Token Fails, 401 Unauthorized',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount2',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['ZATestAccount2', 5],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId2'
          },
          throws: undefined
        }
      },
      transmart: {
        supplierId: {
          auxParams: ['ZATestAccount2'],
          returns: 'supplierIdForTestAccount2'
        }
      },
      auth: {
        generateAuthToken: {
          auxParams: ['WalletAuthSubcriptionIdentifierId2', 'supplierIdForTestAccount2'],
          returns: undefined,
          throws: {
            response: {
              status: 401
            }
          }
        }
      }
    },
    response: {
      status: 401
    }
  },
  generateAuthTokenFails403: {
    title: 'Generation of Auth Token Fails, 403 Forbidden',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount3',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['ZATestAccount3', 5],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId3'
          },
          throws: undefined
        }
      },
      transmart: {
        supplierId: {
          auxParams: ['ZATestAccount3'],
          returns: 'supplierIdForTestAccount3'
        }
      },
      auth: {
        generateAuthToken: {
          auxParams: ['WalletAuthSubcriptionIdentifierId3', 'supplierIdForTestAccount3'],
          returns: undefined,
          throws: {
            response: {
              status: 403
            }
          }
        }
      }
    },
    response: {
      status: 403
    }
  },
  generateAuthTokenFails500: {
    title: 'Generation of Auth Token Fails, 500 Internal Server Error',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount4',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['ZATestAccount4', 5],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId4'
          },
          throws: undefined
        }
      },
      transmart: {
        supplierId: {
          auxParams: ['ZATestAccount4'],
          returns: 'supplierIdForTestAccount4'
        }
      },
      auth: {
        generateAuthToken: {
          auxParams: ['WalletAuthSubcriptionIdentifierId4', 'supplierIdForTestAccount4'],
          returns: undefined,
          throws: {
            response: {
              status: 500
            }
          }
        }
      }
    },
    response: {
      status: 424
    }
  },
  generateAuthTokenPassTought501: {
    title: 'Generation of Auth Token Fails, 501 Internal Server Error',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount5',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['ZATestAccount5', 5],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId5'
          },
          throws: undefined
        }
      },
      transmart: {
        supplierId: {
          auxParams: ['ZATestAccount5'],
          returns: 'supplierIdForTestAccount5'
        }
      },
      auth: {
        generateAuthToken: {
          auxParams: ['WalletAuthSubcriptionIdentifierId5', 'supplierIdForTestAccount5'],
          returns: undefined,
          throws: {
            response: {
              status: 501
            }
          }
        }
      }
    },
    response: {
      status: 501
    }
  },
  // Run throught all the test case varients for dependent service call test.
  // Ideally should just reference the dependance test and then have to setup
  // a configuration to run with all those varients of the deps.
  // otherwise basically a copy and past, into this level.
  generateSupplierIdFails401: {
    title: 'Generation of SupplierId Fails, 401 Unauthorized',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount2',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['ZATestAccount2', 5],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId2'
          },
          throws: undefined
        }
      },
      transmart: {
        supplierId: {
          auxParams: ['ZATestAccount2'],
          throws: {
            response: {
              status: 401
            }
          }
        }
      },
      auth: {
        generateAuthToken: {
          neverReached: true
        }
      }
    },
    response: {
      status: 401
    }
  },
  generateSupplierIdFails403: {
    title: 'Generation of SupplierId Fails, 403 Forbidden',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount2',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['ZATestAccount2', 5],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId2'
          },
          throws: undefined
        }
      },
      transmart: {
        supplierId: {
          auxParams: ['ZATestAccount2'],
          throws: {
            response: {
              status: 403
            }
          }
        }
      },
      auth: {
        generateAuthToken: {
          neverReached: true
        }
      }
    },
    response: {
      status: 403
    }
  },
  generateSupplierIdFails404: {
    title: 'Generation of SupplierId Fails, 404 Bad Request',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount2',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['ZATestAccount2', 5],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId2'
          },
          throws: undefined
        }
      },
      transmart: {
        supplierId: {
          auxParams: ['ZATestAccount2'],
          throws: {
            response: {
              status: 404
            }
          }
        }
      },
      auth: {
        generateAuthToken: {
          neverReached: true
        }
      }
    },
    response: {
      status: 404
    }
  },
  generateSupplierIdFails500: {
    title: 'Generation of SupplierId Fails, 500 Internal Server Error',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount2',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['ZATestAccount2', 5],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId2'
          },
          throws: undefined
        }
      },
      transmart: {
        supplierId: {
          auxParams: ['ZATestAccount2'],
          throws: {
            response: {
              status: 500
            }
          }
        }
      },
      auth: {
        generateAuthToken: {
          neverReached: true
        }
      }
    },
    response: {
      status: 424
    }
  },
  getProfileSubscriptionOfType: {
    title: 'getProfileSubscriptionOfType, return null subscription',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount1',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['ZATestAccount1', 5],
          returns: null
        }
      },
      transmart: {
        supplierId: {
          neverReached: true
        }
      },
      auth: {
        generateAuthToken: {
          neverReached: true
        }
      }
    },
    response: {
      status: 302,
      headers: {
        location: 'TestRedirectParameter?MerchantIdentifier=TestMerchantIdParameter'
      }
    }
  },
  getProfileSubscriptionOfType401: {
    title: 'getProfileSubscriptionOfType, Fails, 401 Unauthorized',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount2',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['ZATestAccount2', 5],
          throws: {
            response: {
              status: 401
            }
          }
        }
      },
      transmart: {
        supplierId: {
          neverReached: true
        }
      },
      auth: {
        generateAuthToken: {
          neverReached: true
        }
      }
    },
    response: {
      status: 401
    }
  },
  getProfileSubscriptionOfType403: {
    title: 'getProfileSubscriptionOfType, Fails, 403 Forbidden',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount3',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['ZATestAccount3', 5],
          throws: {
            response: {
              status: 403
            }
          }
        }
      },
      transmart: {
        supplierId: {
          neverReached: true
        }
      },
      auth: {
        generateAuthToken: {
          neverReached: true
        }
      }
    },
    response: {
      status: 403
    }
  },
  getProfileSubscriptionOfType500: {
    title: 'getProfileSubscriptionOfType, Fails, 500 Internal Server Error => 424 Failed Dependancy',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount4',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['ZATestAccount4', 5],
          throws: {
            response: {
              status: 500
            }
          }
        }
      },
      transmart: {
        supplierId: {
          neverReached: true
        }
      },
      auth: {
        generateAuthToken: {
          neverReached: true
        }
      }
    },
    response: {
      status: 424
    }
  },
  permissionRequiredROLE_SSO: {
    title: 'Permission required ROLE_SSO, forbidden hacking',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount5',
          authorities: []
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          neverReached: true
        }
      },
      transmart: {
        supplierId: {
          neverReached: true
        }
      },
      auth: {
        generateAuthToken: {
          neverReached: true
        }
      }
    },
    response: {
      status: 403
    }
  },
  permissionUsernameNotPrefixedWithZA: {
    title: 'Permission Username not prefixed with ZA, forbidden hacking',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: 'TestType'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'tTestAccount6',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          neverReached: true
        }
      },
      transmart: {
        supplierId: {
          neverReached: true
        }
      },
      auth: {
        generateAuthToken: {
          neverReached: true
        }
      }
    },
    response: {
      status: 403
    }
  },
  typeParameterNotFoundInPath: {
    title: 'Type parameter not found in path.',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount7',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          neverReached: true
        }
      },
      transmart: {
        supplierId: {
          neverReached: true
        }
      },
      auth: {
        generateAuthToken: {
          neverReached: true
        }
      }
    },
    response: {
      status: 400,
      data: {
        message: 'Invalid Request'
      }
    }
  },
  noRedirectConfigFoundForParameterInPath: {
    title: 'No redirect config found for type param in path, for RedirectEndPoint',
    env: {
      config: {
        'vod-ms-digital-wallet.redirectEndPoints': {
          TestType: {
            uri: 'TestRedirectParameter',
            merchantId: 'TestMerchantIdParameter'
          }
        }
      }
    },
    request: {
      method: 'GET',
      params: {
        type: ' Invalid Config'
      },
      headers: {},
      user: {
        jwt: {
          user_name: 'ZATestAccount8',
          authorities: ['ROLE_SSO']
        }
      }
    },
    services: {
      profile: {
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          neverReached: true
        }
      },
      transmart: {
        supplierId: {
          neverReached: true
        }
      },
      auth: {
        generateAuthToken: {
          neverReached: true
        }
      }
    },
    response: {
      status: 400,
      data: {
        message: 'Invalid Request'
      }
    }
  }
};
