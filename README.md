# nodeJSTestFrameWork
Test frame work to facilitate ensuring micro-services correctly work.

This framework initial looked at testing failure cases of micro services, the following were the most important factors.

1. When negative testing, falure testing, errors can be swallowed again and remapped to look correct. For this reason
when any function is called incorrectly, throwing and error in a negative test will not ensure everything is still in working order, due the former statment. Therefore this framework has a global varible that is cleared, before each test case run and is explicitly checked after test case has been run for an error, before anything spesific to the test case is checked.
So instead of throwing and error in a negative the global is set to the error, therefore preserving the original error.

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

So how to address this is with a new approach from which value can be gained!
Instead spesifying and stubing out the dependancies functions, by say called with this return this.
What we do is we load the dependent unit test cases as the requirements to be met at this testing level.
Now instead of you having to furfill your own requirements, you are required to furfill the requirements of the unit test
case for that dependancy framework. This means that a summary of that functions unit test case becomes a set of test case requirements to be met. This will ensure that you test all permutations of inputs to ouput mappings of that dependent function. 

To top this off, ideally from API schema that is to be consumed or the one that this micro-services is consuming can have a loader written to load the existing test cases as requirements for test driving design to furfill.
A completedly tested micro-service test case can be loaded as consuming(bottom) function test cases requirements to furfilling in test driven design.
While still written top level traditional test driven design test cases.

6. Do remeber that depending on how complex the funciton is that you are writting that you may continue to refector the test cases and function signature inputs and add additional unforsearch corner cases and infliction(branching) test cases to ensure all branches in code are exersized.

