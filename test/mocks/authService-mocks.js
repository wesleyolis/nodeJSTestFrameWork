exports.generateAuthToken = {
  otherError: {
    env: {
      config: {
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'AuthIdOtherError', 
      'SupplierId'
    ],
    clients: {
      auth: {
        generateAuthToken: {
          auxParams: ['AuthIdOtherError', 'SupplierId'],
          throws: 'OtherError'
        }
      }
    },
    result: undefined,
    throws: 'OtherError'
  },
  success: {
    env: {
      config: {
      }
    },
    request: { headers: { a: 3 } },
    auxParams: ['AuthIdSucessfully', 'SupplierId'],
    clients: {
      auth: {
        generateAuthToken: {
          auxParams: ['AuthIdSucessfully', 'SupplierId'],
          returns: 'AuthIdOtherError'
        }
      }
    },
    result: 'AuthIdOtherError'
  }
};
