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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId1', 3],
          returns: {
            subscriptionId: '27123456789'
          }
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['27123456789', ['CUSTPTC', 'CUSTOMERTYPE']],
          returns: { CUSTPTC: null, CUSTOMERTYPE: 'CONSUMER' }
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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId2', 3],
          returns: {
            subscriptionId: '27111111111'
          }
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['27111111111', ['CUSTPTC', 'CUSTOMERTYPE']],
          returns: { CUSTPTC: 'BUS', CUSTOMERTYPE: 'CONSUMER' }
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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId1', 3],
          returns: {
            subscriptionId: '27222222222'
          }
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['27222222222', ['CUSTPTC', 'CUSTOMERTYPE']],
          returns: { CUSTPTC: 'BUS', CUSTOMERTYPE: 'BUSINESS' }
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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId1', 3],
          returns: {
            subscriptionId: '27333333333'
          }
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['27333333333', ['CUSTPTC', 'CUSTOMERTYPE']],
          returns: { CUSTPTC: 'MISSMATCH', CUSTOMERTYPE: 'MISMATCH' }
        }
      }
    },
    result: 'SupplierIDfallbackTest'
  },
  supplierIdPartialEBUCBU: {
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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId1', 3],
          returns: {
            subscriptionId: '27999999999'
          }
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['27999999999', ['CUSTPTC', 'CUSTOMERTYPE']],
          returns: null
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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId1', 3],
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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId1', 3],
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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId1', 3],
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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId1', 3],
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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId1', 3],
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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId1', 3],
          returns: '27122222222'
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['27122222222', ['CUSTPTC', 'CUSTOMERTYPE']],
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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId1', 3],
          returns: '27133333333'
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['27133333333', ['CUSTPTC', 'CUSTOMERTYPE']],
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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId1', 3],
          returns: '27144444444'
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['27144444444', ['CUSTPTC', 'CUSTOMERTYPE']],
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
        SubscriptionType: {
          returns: { digitalWallet: 5, msisdn: 3 }
        },
        getProfileSubscriptionOfType: {
          auxParams: ['profileIdSupplierId1', 3],
          returns: '27155555555'
        }
      },
      msisdn: {
        getMsisdnDetails:
        {
          auxParams: ['27155555555', ['CUSTPTC', 'CUSTOMERTYPE']],
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
};

module.exports = { supplierId };
