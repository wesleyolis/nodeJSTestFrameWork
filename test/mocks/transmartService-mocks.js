const supplierId = {
  supplierIdCBU: {
    env: {
      config: {
        'vod-ms-digital-wallet.services.transmart.supplierIds.fallback': 'SupplierIDfallbackTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.CBU': 'SupplierIDCBUTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.EBU': 'SupplierIDEBUTest'
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdSupplierId1'
    ],
    services: {
      profile: {
        getProfileSubscriptionOfTypeMSISDN: {
          auxParams: ['profileIdSupplierId1'],
          returns: 'msisdnProfileID'
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['msisdnProfileID', ['CUSPTC', 'CUSTOMERTYPE']],
          returns: { CUSPTC: null, CUSTOMERTYPE: 'CONSUMER' }
        }
      }
    },
    result: 'SupplierIDCBUTest'
  },
  supplierIdEBU1: {
    env: {
      config: {
        'vod-ms-digital-wallet.services.transmart.supplierIds.fallback': 'SupplierIDfallbackTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.CBU': 'SupplierIDCBUTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.EBU': 'SupplierIDEBUTest'
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdSupplierId2'
    ],
    services: {
      profile: {
        getProfileSubscriptionOfTypeMSISDN: {
          auxParams: ['profileIdSupplierId2'],
          returns: 'msisdnProfileID2'
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['msisdnProfileID2', ['CUSPTC', 'CUSTOMERTYPE']],
          returns: { CUSPTC: 'BUS', CUSTOMERTYPE: 'CONSUMER' }
        }
      }
    },
    result: 'SupplierIDEBUTest'
  },
  supplierIdEBU2: {
    env: {
      config: {
        'vod-ms-digital-wallet.services.transmart.supplierIds.fallback': 'SupplierIDfallbackTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.CBU': 'SupplierIDCBUTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.EBU': 'SupplierIDEBUTest'
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdSupplierId1'
    ],
    services: {
      profile: {
        getProfileSubscriptionOfTypeMSISDN: {
          auxParams: ['profileIdSupplierId1'],
          returns: 'msisdnProfileID'
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['msisdnProfileID', ['CUSPTC', 'CUSTOMERTYPE']],
          returns: { CUSPTC: 'BUS', CUSTOMERTYPE: 'BUSINESS' }
        }
      }
    },
    result: 'SupplierIDEBUTest'
  },
  supplierIdMissMatchedEBUCBU: {
    env: {
      config: {
        'vod-ms-digital-wallet.services.transmart.supplierIds.fallback': 'SupplierIDfallbackTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.CBU': 'SupplierIDCBUTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.EBU': 'SupplierIDEBUTest'
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdSupplierId1'
    ],
    services: {
      profile: {
        getProfileSubscriptionOfTypeMSISDN: {
          auxParams: ['profileIdSupplierId1'],
          returns: 'msisdnProfileID'
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['msisdnProfileID', ['CUSPTC', 'CUSTOMERTYPE']],
          returns: { CUSPTC: 'MISSMATCH', CUSTOMERTYPE: 'MISMATCH' }
        }
      }
    },
    result: 'SupplierIDfallbackTest'
  },
  // This should actually load form the previous function test results,
  // because stil make this absolutely anything and it can be wrong..
  // Just to think of the best way to do this, but that is the idea.
  // The deps test, should be the loaded test for the use of the deps.
  // which means all logic gets tested and all the results.
  // typically could look at aggregating the results, throws, ignoring the inputs.
  supplierIdNoMsisdn: {
    env: {
      config: {
        'vod-ms-digital-wallet.services.transmart.supplierIds.fallback': 'SupplierIDfallbackTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.CBU': 'SupplierIDCBUTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.EBU': 'SupplierIDEBUTest'
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdSupplierId1'
    ],
    services: {
      profile: {
        getProfileSubscriptionOfTypeMSISDN: {
          auxParams: ['profileIdSupplierId1'],
          returns: null
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          neverReached: true
        }
      }
    },
    result: 'SupplierIDfallbackTest'
  },
  supplierIdMSISDN401: {
    env: {
      config: {
        'vod-ms-digital-wallet.services.transmart.supplierIds.fallback': 'SupplierIDfallbackTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.CBU': 'SupplierIDCBUTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.EBU': 'SupplierIDEBUTest'
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdSupplierId1'
    ],
    services: {
      profile: {
        getProfileSubscriptionOfTypeMSISDN: {
          auxParams: ['profileIdSupplierId1'],
          throws: {
            response: {
              status: 401
            }
          }
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          neverReached: true
        }
      }
    },
    throws: {
      response: {
        status: 401
      }
    }
  },
  supplierIdMSISDN403: {
    env: {
      config: {
        'vod-ms-digital-wallet.services.transmart.supplierIds.fallback': 'SupplierIDfallbackTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.CBU': 'SupplierIDCBUTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.EBU': 'SupplierIDEBUTest'
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdSupplierId1'
    ],
    services: {
      profile: {
        getProfileSubscriptionOfTypeMSISDN: {
          auxParams: ['profileIdSupplierId1'],
          throws: {
            response: {
              status: 403
            }
          }
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          neverReached: true
        }
      }
    },
    throws: {
      response: {
        status: 403
      }
    }
  },
  supplierIdMSISDN404: {
    env: {
      config: {
        'vod-ms-digital-wallet.services.transmart.supplierIds.fallback': 'SupplierIDfallbackTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.CBU': 'SupplierIDCBUTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.EBU': 'SupplierIDEBUTest'
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdSupplierId1'
    ],
    services: {
      profile: {
        getProfileSubscriptionOfTypeMSISDN: {
          auxParams: ['profileIdSupplierId1'],
          throws: {
            response: {
              status: 404
            }
          }
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          neverReached: true
        }
      }
    },
    throws: {
      response: {
        status: 404
      }
    }
  },
  supplierIdMSISDN500: {
    env: {
      config: {
        'vod-ms-digital-wallet.services.transmart.supplierIds.fallback': 'SupplierIDfallbackTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.CBU': 'SupplierIDCBUTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.EBU': 'SupplierIDEBUTest'
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdSupplierId1'
    ],
    services: {
      profile: {
        getProfileSubscriptionOfTypeMSISDN: {
          auxParams: ['profileIdSupplierId1'],
          throws: {
            response: {
              status: 500
            }
          }
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          neverReached: true
        }
      }
    },
    throws: {
      response: {
        status: 500
      }
    }
  },
  supplierIdMISIDNDetails401: {
    env: {
      config: {
        'vod-ms-digital-wallet.services.transmart.supplierIds.fallback': 'SupplierIDfallbackTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.CBU': 'SupplierIDCBUTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.EBU': 'SupplierIDEBUTest'
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdSupplierId1'
    ],
    services: {
      profile: {
        getProfileSubscriptionOfTypeMSISDN: {
          auxParams: ['profileIdSupplierId1'],
          returns: 'MSISDN'
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['MSISDN', ['CUSPTC', 'CUSTOMERTYPE']],
          throws: {
            response: {
              status: 401
            }
          }
        }
      }
    },
    throws: {
      response: {
        status: 401
      }
    }
  },
  supplierIdMISIDNDetails403: {
    env: {
      config: {
        'vod-ms-digital-wallet.services.transmart.supplierIds.fallback': 'SupplierIDfallbackTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.CBU': 'SupplierIDCBUTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.EBU': 'SupplierIDEBUTest'
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdSupplierId1'
    ],
    services: {
      profile: {
        getProfileSubscriptionOfTypeMSISDN: {
          auxParams: ['profileIdSupplierId1'],
          returns: 'MSISDN'
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['MSISDN', ['CUSPTC', 'CUSTOMERTYPE']],
          throws: {
            response: {
              status: 403
            }
          }
        }
      }
    },
    throws: {
      response: {
        status: 403
      }
    }
  },
  supplierIdMISIDNDetails404: {
    env: {
      config: {
        'vod-ms-digital-wallet.services.transmart.supplierIds.fallback': 'SupplierIDfallbackTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.CBU': 'SupplierIDCBUTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.EBU': 'SupplierIDEBUTest'
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdSupplierId1'
    ],
    services: {
      profile: {
        getProfileSubscriptionOfTypeMSISDN: {
          auxParams: ['profileIdSupplierId1'],
          returns: 'MSISDN'
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['MSISDN', ['CUSPTC', 'CUSTOMERTYPE']],
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
    }
  },
  supplierIdMISIDNDetails500: {
    env: {
      config: {
        'vod-ms-digital-wallet.services.transmart.supplierIds.fallback': 'SupplierIDfallbackTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.CBU': 'SupplierIDCBUTest',
        'vod-ms-digital-wallet.services.transmart.supplierIds.EBU': 'SupplierIDEBUTest'
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'profileIdSupplierId1'
    ],
    services: {
      profile: {
        getProfileSubscriptionOfTypeMSISDN: {
          auxParams: ['profileIdSupplierId1'],
          returns: 'MSISDN'
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['MSISDN', ['CUSPTC', 'CUSTOMERTYPE']],
          throws: {
            response: {
              status: 500
            }
          }
        }
      }
    },
    throws: {
      response: {
        status: 500
      }
    }
  }

  // notFound: {
  //   env: {
  //     config: {
  //       'vod-ms-digital-wallet.profileSubscriptionTypeOfDigitalWallet': 5,
  //       'vod-ms-digital-wallet.profileSubscriptionTypeOfMSISDN': undefined
  //     }
  //   },
  //   request: { headers: { a: 2 } },
  //   auxParams: [
  //     'ProfileIdNotFound'
  //   ],
  //   clients: {
  //     profile: {
  //       getProfileSubscriptionOfType: {
  //         auxParams: ['ProfileIdNotFound', 5],
  //         throws: {
  //           response: {
  //             status: 404
  //           }
  //         }
  //       }
  //     }
  //   },
  //   throws: {
  //     response: {
  //       status: 404
  //     }
  //   },
  //   result: null
  // },
  // success: {
  //   env: {
  //     config: {
  //       'vod-ms-digital-wallet.profileSubscriptionTypeOfDigitalWallet': 5,
  //       'vod-ms-digital-wallet.profileSubscriptionTypeOfMSISDN': undefined
  //     }
  //   },
  //   request: { headers: { a: 3 } },
  //   auxParams: ['profileIdSucessfull'],
  //   clients: {
  //     profile: {
  //       getProfileSubscriptionOfType: {
  //         auxParams: ['profileIdSucessfull', 5],
  //         returns: {
  //           data: {
  //             result: {
  //               subscriptions: [
  //                 {
  //                   subscriptionId: 'SubscriptionIdSucessfull3'
  //                 }
  //               ]
  //             }
  //           }
  //         }
  //       }
  //     }
  //   },
  //   result: {
  //     subscriptionId: 'SubscriptionIdSucessfull3'
  //   }
  // }
};

module.exports = { supplierId };
