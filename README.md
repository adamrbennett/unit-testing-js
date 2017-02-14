# JavaScript Unit Testing Libraries and Frameworks

## [QUnit](https://qunitjs.com/)
> Testing framework focused on DOM testing

License: Proprietary (free to use/sell/modify)

#### Pros
1. Runs in Node.js or browser
2. Can test static HTML
3. Used by jQuery

#### Cons
1. Lacks fluent syntax
2. Configuration is a headache, and must constantly be maintained
3. Makes including 3rd party libraries (like assertion libraries) relatively difficult
4. Asynchronous testing can be a bit of a headache
5. No baked-in headless run support

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>QUnit Example</title>
  <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.1.1.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script src="https://code.jquery.com/qunit/qunit-2.1.1.js"></script>
  <script src="tests.js"></script>
</body>
</html>
```

```javascript
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
```

---

## [Karma](https://karma-runner.github.io)
> Karma is essentially a tool which spawns a web server that executes source code against test code for each of the browsers connected. The results of each test against each browser are examined and displayed via the command line to the developer such that they can see which browsers and tests passed or failed.

License: MIT

#### Pros
1. Test framework agnostic
2. "Simple" integration with Jenkins, Travis or Semaphore
3. Developed by AngularJS team
4. Test against real browsers

#### Cons
1. TBD

---

## [Protractor](http://www.protractortest.org)
> Protractor is an end-to-end test framework for AngularJS applications. Protractor runs tests against your application running in a real browser, interacting with it as a user would.

License: MIT

#### Pros
1. AngularJS specific
2. Easy to learn if you know AngularJS
3. Intuitive syntax, easy to read and understand (specially if you come from a Ruby background).
4. More tutorials and practical example than Intern.

#### Cons
1. AngularJS specific?
2. Not a good choice for non-AngularJS applications. If used for non-AngularJS applications there is no way of ensuring that elements are loaded dynamically so you will have to use setTimeout().

```javascript
// todo-spec.js
describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('https://angularjs.org');

    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);
  });
});
```

---

## [Intern](https://theintern.github.io/)
> Intern is a complete test system for JavaScript designed to help you write and run consistent, high-quality test cases for your JavaScript libraries and applications. It can be used to test any JavaScript code. It can even be used to test non-JavaScript Web and mobile apps, and to run tests written for other test systems.

License: New BSD

#### Pros
1. More generic than Protractor (Integration testing should not be coupled with the application framework).
2. In Intern everything is a promise. This is the way intern handles asynchronicity. The method setFindTimeout() sets the default wait time for elements to be loaded. If the page will take longer to load than specified by setFindTimeout() then the test will fail.
3. It can be integrated easily with BrowserStack if you need to do cross-browser checking. This is important if you need to test against a real browser instead of PhantomJS.
4. Big name users (twitter, stripe, mozilla, ibm, etc)

#### Cons
1. Not very well documented (Documentation can be found here but it’s not very comprehensive. It does not have good descriptions of how to use it and there are no practical examples).
2. Not easy to find solutions when you get stuck. There are not many blog posts about it and not enough stack overflow answers.
3. Lacks very basic functionality like find element by text or conditional find (After looking at the documentation and searching online I came up with a solution that worked but it looked quite messy).
4. Syntax is hard to read and the nesting becomes hard to follow (for example, it’s hard to find where to put .end() and where to resolve the promise with .then()).
5. It can be hard to debug Intern tests running against an AngularJS application (e.g. to write in a text input you would expect that firstly you have to click the input to get the focus and then to type. Because of the working of AngularJS this is flaky. Instead of this you can use type()).

```javascript
define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    'passing test': function () {
      var result = 2 + 3;

      assert.equal(result, 5,
        'Addition operator should add numbers together');
    },
    'failing test': function () {
      var result = 2 * 3;

      assert.equal(result, 5,
        'Addition operator should add numbers together');
    }
  });
});
```

---

## [Jasmine](https://jasmine.github.io/)
> Jasmine is a Behavior Driven Development testing framework for JavaScript. It does not rely on browsers, DOM, or any JavaScript framework. Thus it's suited for websites, Node.js projects, or anywhere that JavaScript can run.

License: MIT

#### Pros
1. Simple setup for node through jasmine-node
2. Headless running out of the box
3. Nice fluent syntax for assertions built-in, and does play pretty well with other assertion libraries
4. Supported by many CI servers (TeamCity, Codeship, etc.) and some that don’t support natively have plugins (jenkins has a maven plugin)
5. Descriptive syntax for BDD paradigm
6. Very popular
7. Everything comes bundled

#### Cons
1. Asynchronous testing can be a bit of a headache
2. Expects a specific suffix to all test files (spec.js by default)
3. Everything comes bundled

```javascript
describe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(true);
  });
});
```

---

## [Sinon](http://sinonjs.org/)
> Standalone and test framework agnostic JavaScript test spies, stubs and mocks.

License: BSD

#### Pros
1. Modular and focused only on spying, stubbing and mocking.
2. No dependencies, works with any unit testing framework.

#### Cons
1. Not a complete suite. Should be coupled with a test runner and assertion library.

```javascript
// test spy
it("calls original function with right this and args", function () {
    var callback = sinon.spy();
    var proxy = once(callback);
    var obj = {};

    proxy.call(obj, 1, 2, 3);

    assert(callback.calledOn(obj));
    assert(callback.calledWith(1, 2, 3));
});
```

```javascript
// test stub
it("returns the return value from the original function", function () {
    var callback = sinon.stub().returns(42);
    var proxy = once(callback);

    assert.equals(proxy(), 42);
});
```

---

## [Mocha.js](https://mochajs.org/)
> Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.

License: MIT

#### Pros
1. Very popular and active community. Over 100K dependent npm projects.
2. Simple setup
3. Headless running out of the box
4. Allows use of any assertion library that will throw exceptions on failure, such as Chai
5. Supported by some CI servers and plugins for others (jenkins has a maven plugin)
6. Has aliases for functions to be more BDD-oriented or TDD-oriented
7. Highly extensible
8. Asynchronous testing is a breeze

#### Cons
1. Newer to the field, so support might be lacking in certain areas
2. Runs all tests in one process. Shared resources -- no isolation.

```javascript
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
```

---

## [AVA](https://github.com/avajs/ava)
> Concurrent JavaScript test runner

License: MIT

#### Pros
1. Minimal and fast
2. Simple test syntax
3. Runs tests concurrently
4. Enforces writing atomic tests
5. No implicit globals
6. Isolated environment for each test file
7. Write your tests in ES2017
8. Promise support
9. Generator function support
10. Async function support
11. Observable support
12. Enhanced assertion messages
13. TAP reporter
14. Clean stack traces
15. Automatic migration from other test runners

#### Cons
1. TBD

```javascript
import test from 'ava';

test('foo', t => {
    t.pass();
});

test('bar', async t => {
    const bar = Promise.resolve('bar');

    t.is(await bar, 'bar');
});
```

---

## [Chai](http://chaijs.com/)
> Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.

License: MIT

#### Pros
1. TBD

#### Cons
1. TBD

```javascript
chai.should();

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
tea.should.have.property('flavors')
  .with.lengthOf(3);
```

```javascript
var expect = chai.expect;

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(tea).to.have.property('flavors')
  .with.lengthOf(3);
```

```javascript
var assert = chai.assert;

assert.typeOf(foo, 'string');
assert.equal(foo, 'bar');
assert.lengthOf(foo, 3)
assert.property(tea, 'flavors');
assert.lengthOf(tea.flavors, 3);
```
