exports.generateAuthToken = {

  depsConfiguration: {
    // Where to load all the test configuration from, which can be auto loaded,
    // unless a spesific one is loaded and overidden and that would also require
    // dependencies to be overload for that function as well.
    // nest approach is that have whoIsDependentOnThisTest?
    // but then ideally the should put it in the deps as a constrain for filing purposes.
    //
    clients: {
      auth: { path: './', funcs: [] }
    }
  },

  // ------------------
  // We just
  func: {
    describe: '',
    depsConfiguration: {
      // Where to load all the test configuration from, which can be auto loaded,
      // unless a spesific one is loaded and overidden and that would also require
      // dependencies to be overload for that function as well.
      // nest approach is that have whoIsDependentOnThisTest?
      // but then ideally the should put it in the deps as a constrain for filing purposes.
      //
      clients: {
        auth: { path: './', funcs: [], overidePaths:'Spesific test, that will also be run to give more spesific parameters.' }
      }
    },
    env: {
      config: {}
    },
    inter: {}, // depsConfig Loading.., no mock of deps, on config of deps..
    func: {}, // env only, no mock of deps or depsConfig
    units: { //env, mockdeps
      testCase: {
        title: '',
        type: 'unit', 'func', 'inter'
        whoIsDependentOnThisTest: '../../src/services/transmartServiceauthService#supplierId',
        env: {
          config: {

          }
        },
        request: {},
        auxParams: [],
        deps: {
          module: {
            function: 'throws.testCase', // Narrow the test case..
            functioB: ['unit.testA', 'unit.testB']
          },
          module2: {
            function: 'rangeThrows.TestA',
            functionC: ['throws.A', 'throws.B'] // run thought everything..
          },
          module3: {
            func: {
              auxParams: [],
              throws: '',
              returns: '',
              neverReached: true, // This basically helps lock down the shape of the deps.
              neverCalled: true // This basically also ensures the shape and order of operations is maintained.
              // Here we may want ordinal, if we want to ensure spesific major ordering.
            }
          }
        },
        params: [],
        request: {},
        throws: {}, // Can just index these functions at the end of the day, by default when called, will tought..
        // this means that in test driven design, that, we shall with out writting any throw test, that
        // we be checking the error handling from the start.. With out having to write all the tests,
        // until we need to cover more.
        // Basically we can do a check for an array.
        response: {}
      },
      testCase2: {
        deps: {
          module: {
            function: 'throws.testCaseA'
          }
        }
      },
      testCase3: {}
    },
    // These are like the 500, 401, 403, 404, extra..
    throws: {
      testCase: {},
      testCase2: {},
      testCase3: {}
    },
    fileThrows: 'pathTo the file from which to load things.', // Common dependencies,
    rangeThrows: {
      // required to find symbols
      rangeA: {
        permutate:
        {
          keyA: {
            start: 'A',
            end: 200,
            permutate: {
              keyB: {
                start: 0,
                end: 150
              }
            }
          }
        },
        returns: 'string{{keyB}}',
        throws: {
          response: {
            status: 'number{{keyA}}'
          }
        }
      }
    }
    // Typically we can either spesifiy explicity, deps this test uses, or we can detect them.
    // I think that we can rather detect them.
    // What we could do is allow, the case that are avaliable for the test to be limited,
    // or to say this would be the exactly test case I would expect, which allow
    // debugging to be much simpler.
    // We are required to trigger throws, so we would need to indicate which test can be run against which throws.
  }
};
