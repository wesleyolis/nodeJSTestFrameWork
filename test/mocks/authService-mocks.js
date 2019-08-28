exports.generateAuthToken = {
  otherError: {
    env: {
      config: {
      }
    },
    request: { headers: { a: 1 } },
    auxParams: [
      'AuthIdOtherError'
    ],
    clients: {
      auth: {
        generateAuthToken: {
          auxParams: ['AuthIdOtherError'],
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
    auxParams: ['AuthIdSucessfully'],
    clients: {
      auth: {
        generateAuthToken: {
          auxParams: ['AuthIdSucessfully'],
          returns: 'AuthIdOtherError'
        }
      }
    },
    result: 'AuthIdOtherError'
  }
};
