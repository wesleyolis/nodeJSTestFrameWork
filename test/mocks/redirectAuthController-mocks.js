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
        getProfileSubscriptionOfTypeDigitalWallet: {
          auxParams: ['ZATestAccount1'],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId1'
          },
          throws: undefined
        }
      },
      auth: {
        generateAuthToken: {
          auxParams: ['WalletAuthSubcriptionIdentifierId1'],
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
        getProfileSubscriptionOfTypeDigitalWallet: {
          auxParams: ['ZATestAccount2'],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId2'
          },
          throws: undefined
        }
      },
      auth: {
        generateAuthToken: {
          auxParams: ['WalletAuthSubcriptionIdentifierId2'],
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
        getProfileSubscriptionOfTypeDigitalWallet: {
          auxParams: ['ZATestAccount3'],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId3'
          },
          throws: undefined
        }
      },
      auth: {
        generateAuthToken: {
          auxParams: ['WalletAuthSubcriptionIdentifierId3'],
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
        getProfileSubscriptionOfTypeDigitalWallet: {
          auxParams: ['ZATestAccount4'],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId4'
          },
          throws: undefined
        }
      },
      auth: {
        generateAuthToken: {
          auxParams: ['WalletAuthSubcriptionIdentifierId4'],
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
        getProfileSubscriptionOfTypeDigitalWallet: {
          auxParams: ['ZATestAccount5'],
          returns: {
            subscriptionId: 'WalletAuthSubcriptionIdentifierId5'
          },
          throws: undefined
        }
      },
      auth: {
        generateAuthToken: {
          auxParams: ['WalletAuthSubcriptionIdentifierId5'],
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
  getProfileSubscriptionOfTypeDigitalWallet: {
    title: 'getProfileSubscriptionOfTypeDigitalWallet, return null subscription',
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
        getProfileSubscriptionOfTypeDigitalWallet: {
          auxParams: ['ZATestAccount1'],
          returns: null
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
  getProfileSubscriptionOfTypeDigitalWallet401: {
    title: 'getProfileSubscriptionOfTypeDigitalWallet, Fails, 401 Unauthorized',
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
        getProfileSubscriptionOfTypeDigitalWallet: {
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
  getProfileSubscriptionOfTypeDigitalWallet403: {
    title: 'getProfileSubscriptionOfTypeDigitalWallet, Fails, 403 Forbidden',
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
        getProfileSubscriptionOfTypeDigitalWallet: {
          auxParams: ['ZATestAccount3'],
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
  getProfileSubscriptionOfTypeDigitalWallet500: {
    title: 'getProfileSubscriptionOfTypeDigitalWallet, Fails, 500 Internal Server Error => 424 Failed Dependancy',
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
        getProfileSubscriptionOfTypeDigitalWallet: {
          auxParams: ['ZATestAccount4'],
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
        getProfileSubscriptionOfTypeDigitalWallet: {
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
        getProfileSubscriptionOfTypeDigitalWallet: {
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
        getProfileSubscriptionOfTypeDigitalWallet: {
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
        getProfileSubscriptionOfTypeDigitalWallet: {
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
