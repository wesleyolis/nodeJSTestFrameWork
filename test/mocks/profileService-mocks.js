const getProfileSubscriptionOfTypeDigitalWallet = {
  otherError: {
    env: {
      config: {
        'vod-ms-digital-wallet.profileSubscriptionTypeOfDigitalWallet': 5,
        'vod-ms-digital-wallet.profileSubscriptionTypeOfMSISDN': undefined
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdOtherError'
    ],
    clients: {
      profile: {
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdOtherError', 5],
          throws: 'OtherError'
        }
      }
    },
    result: undefined,
    throws: 'OtherError'
  },
  notFound: {
    env: {
      config: {
        'vod-ms-digital-wallet.profileSubscriptionTypeOfDigitalWallet': 5,
        'vod-ms-digital-wallet.profileSubscriptionTypeOfMSISDN': undefined
      }
    },
    request: { headers: { a: 2 } },
    auxParams: [
      'ProfileIdNotFound'
    ],
    clients: {
      profile: {
        getProfileSubscriptionOfType: {
          auxParams: ['ProfileIdNotFound', 5],
          throws: {
            response: {
              status: 404
            }
          }
        }
      }
    },
    throws: {
      response: {
        status: 404
      }
    },
    result: null
  },
  success: {
    env: {
      config: {
        'vod-ms-digital-wallet.profileSubscriptionTypeOfDigitalWallet': 5,
        'vod-ms-digital-wallet.profileSubscriptionTypeOfMSISDN': undefined
      }
    },
    request: { headers: { a: 3 } },
    auxParams: ['profileIdSucessfull'],
    clients: {
      profile: {
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSucessfull', 5],
          returns: {
            data: {
              result: {
                subscriptions: [
                  {
                    subscriptionId: 'SubscriptionIdSucessfull3'
                  }
                ]
              }
            }
          }
        }
      }
    },
    result: {
      subscriptionId: 'SubscriptionIdSucessfull3'
    }
  }
};


module.exports = { getProfileSubscriptionOfTypeDigitalWallet };
