# nodeJSTestFrameWork
Test frame work to facilitate ensuring micro-services correctly work.

This framework initial looked at testing failure cases of micro services, the following were the most important factors.

1. When negative testing, falure testing, errors can be swallowed again and remapped to look correct. For this reason
when any function is called incorrectly, throwing and error in a negative test will not ensure everything is still in working order, due the former statment. Therefore this framework has a global varible that is cleared, before each test case run and is explicitly checked after test case has been run for an error, before anything spesific to the test case is checked.
So instead of throwing and error in a negative the global is set to the error, therefore preserving the original error.

1.2 To elaborate futher on this matter and put it into perspective.
The classification of your unit test cases or intergration test cases can be classified into 3 categories of errors.
a. Positive cases Failures, given set of inputs and provide the enviroment is also fixed it results spesific output being returned.
b. Negative cases, given set of inputs and provided the enviroment is fixed, it results in spesific set of return errors or throw errors depending our the language style choosen to follow.
c. Then there is the test frame work configuration setup discrepancies, misconfiguration, errors, theres are things that are not supposed to have happened or were supped to have happened, however, due some mistake the stub may have had any matching parameters in which to throw or return a response.

When dealing with how to fail your test with regards to framework configuration expected behaviour that has not been met or is wrong for any of the above reason, then the only way to communicate this test failure should be via a mechanisms that is not the same as in positive and negative cases. In otherwords don't use return value, return error, throw error to commnicate the issues out, because there many layers of your application were the return and throw will be remutated and can results in there being no change in the top level input to outputs(returns, throws), which means won't pick up bugs when there are refactors potentially.

So the best approach is to use another mechanisms, in this case the simplist is to have a global variable for each test case, that is null(empty) at the stat of the test and at the end of the test, anything wrong with the framework, assigns its communication to this variable. Which then is the first variable of the test case to be check that is is null and nothing is wrong with the configurationa dn setup or function was called with in correct parameters.

When doing this assignment something along the lines, that preserve the variables contents if it is not null, such that the first error will be seen and not the last.

Example:

```.js
let unexpectedError = null;

// assign results
unexpectedError = !!unexpectedError || 'The current error you would like to assign';
```

2. When loading all configuration from files, it is also important that don't use throw and use the global error as required during the test run to communicate incorrect configuration. If you want fast fail up front then throw while setting up, if you would like to see an incremental failure for each incorrectly configured test case then use the global test runtime variable, which allow all tests to run, while seeing just the failed ones.

3. Ideally the enviroment can change under neither the test as well, so needs to be configurable.

4. when using proxify there are issues when written enclose class type style, were constants and types are exported and these variables values are read from the enviroment, because proxify can only work at a single level of depth or everything,
which is not idealy. I want to modify and have a look at it, must just get there to implemented a @scope, @depth modifier
for proxify loader, so that correctly write encapsulating style code, that test framework can support.

5. The most important is that this type of testing, is basically one furfilling ones requirements,
which defeats the points, it may highlight syntax mistake and but passing of wrong parameters and things it won't.
Because you spesified the requirements and you and then furfulling the requirements you set, so make mistake in both places 
no will be non the wiser or better off. This is especially the case in script type language with no typings.
Basically works if this is test driven design.

In a scripted languaged, were by you stub out functions, you replace the whole existing function with a new one,
in javasript as far I know, when you stub a function with your own requirement, there is nothing ensure that  the function
signature of the params is the same, you could for that matter make function that takes 5 arguments veruss existing 3.
There is also in javascript the ability to naturally call a function with more params than required. When it comes to refactoring then changes in the number of params a function takes will not cause your tests to break.

In a way one could look at this from the perspective that, because furfilling ones own requirements, one is only really
testing the branching loginc and little bit of the simple independent function with no external depdendancies.
So if I look at things from this perspective. I would say that you can lock down business functionality and rules
with the current approach, to ensure that no breaks the business rules or critical system features behaviours.
When refactoring, your tests will not be able to highlight mistakes in function mapping/binding of methods and calls,
which is what a type languange would normal check for you, in a scripting language this is lost. You can't ensure that the code actually works and exicutes properly, because you were furfilling your own requirements, were still have made mistakes.
So typically this is going to require you to manually cause the production code with test enviroment configuration to execute all code paths, to ensure things correctly work and that function binding is still correct. This what typed language and compiler give you out of the box.

So the question is how to address what a script language like javascript can't do ensuring the binding is correct and that all permutations of a stub/mocked function are correct.



So how to address this is with a new approach from which value can be gained!
Instead spesifying and stubing out the dependancies functions, by say called with this return this.
What we do is we load the dependent unit test cases as the requirements to be met at this testing level.
Now instead of you having to furfill your own requirements, you are required to furfill the requirements of the unit test
case for that dependancy framework function. This means that a summary/aggregation of that functions unit test case inputs to outputs, becomes a set of test case requirements to be met. This will ensure that you test all permutations of inputs to ouput mappings of that dependent function. 

It also ensure by the nature that you wrote a unit test for the depdenent function, that you have a set of test cases input to ouput(return/throw) aggregation, to validate the function signature for binding, in which case you get the benifit of the tests being able to ensure to higher degree than before that code would work in production and not pootentially need such rigiourious testing. As when refactoring, if you back or mess up a function call signature binding. Then by the nature that you have to have update the unit test for that depo function, you will have update the function signature of all the test case to be loaded as the input to output mappings cases when stubing out functions, if there is a call that in the incorrect formate, then it miss match the dep func unit test params.

To top this off, ideally from API schema that is to be consumed or the one that this micro-services is consuming can have a loader written to load the existing test cases as requirements for test driving design to furfill.
A completedly tested micro-service test case can be loaded as consuming(bottom) function test cases requirements to furfilling in test driven design.
While still written top level traditional test driven design test cases.

6. Do remeber that depending on how complex the funciton is that you are writting that you may continue to refector the test cases and function signature inputs and add additional unforsearch corner cases and infliction(branching) test cases to ensure all branches in code are exersized


-----------------------------------------------------------------------


RedirectAuthController
- Client Wrapper - GetProfileSubscriptionOfTypeDigitalWallet
  - Function Test Cases: Testing Redirect Auth Controller\
        ✓ Sucessfully redirect with token, were all inputs were wellformed. (190ms)\
        ✓ Generation of Auth Token Fails, 401 Unauthorized\
        ✓ Generation of Auth Token Fails, 403 Forbidden\
        ✓ Generation of Auth Token Fails, 500 Internal Server Error\
        ✓ Generation of Auth Token Fails, 501 Internal Server Error\
        ✓ Generation of SupplierId Fails, 401 Unauthorized\
        ✓ Generation of SupplierId Fails, 403 Forbidden\
        ✓ Generation of SupplierId Fails, 404 Bad Request\
        ✓ Generation of SupplierId Fails, 500 Internal Server Error\
        ✓ getProfileSubscriptionOfType, return null subscription\
        ✓ getProfileSubscriptionOfType, Fails, 401 Unauthorized\
        ✓ getProfileSubscriptionOfType, Fails, 403 Forbidden\
        ✓ getProfileSubscriptionOfType, Fails, 500 Internal Server Error => 424 Failed Dependancy\
        ✓ Permission required ROLE_SSO, forbidden hacking\
        ✓ Permission Username not prefixed with ZA, forbidden hacking\
        ✓ Type parameter not found in path.\
        ✓ No redirect config found for type param in path, for RedirectEndPoint\

- Auth Service
  - Function Test Cases: generateAuthToken\
      ✓ otherError\
      ✓ success

- Profile Service
  - Client Wrapper - GetProfileSubscriptionOfType\
      Function Test Cases: Testing Profile Subscription Of Type Digital Wallet\
        ✓ otherError\
        ✓ notFound\
        ✓ success
- Bulk Configuration Run
  - Function Test Cases: getProfileSubscriptionOfType\
        ✓ otherError\
        ✓ notFound\
        ✓ success
  - Function Test Cases: SubscriptionType\
        ✓ types

- Transmart Service
    - Function Test Cases: SupplierId cases revealing input to output result and throws of encapsulated functionality\
      ✓ supplierIdCBU\
      ✓ supplierIdEBU1\
      ✓ supplierIdEBU2\
      ✓ supplierIdMissMatchedEBUCBU\
      ✓ supplierIdPartialEBUCBU\
      ✓ supplierIdNoMsisdn\
      ✓ supplierIdMSISDN401\
      ✓ supplierIdMSISDN403\
      ✓ supplierIdMSISDN404\
      ✓ supplierIdMSISDN500\
      ✓ supplierIdMISIDNDetails401\
      ✓ supplierIdMISIDNDetails403\
      ✓ supplierIdMISIDNDetails404\
      ✓ supplierIdMISIDNDetails500


  40 passing (233ms)
