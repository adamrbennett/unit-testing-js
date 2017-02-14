# JavaScript Unit Testing Libraries and Frameworks

## [Jasmine](https://jasmine.github.io/)
> Jasmine is a Behavior Driven Development testing framework for JavaScript. It does not rely on browsers, DOM, or any JavaScript framework. Thus it's suited for websites, Node.js projects, or anywhere that JavaScript can run.

License: MIT

#### Pros
1. Simple setup for node through jasmine-node
1. Headless running out of the box
1. Nice fluent syntax for assertions built-in, and does play pretty well with other assertion libraries
1. Supported by many CI servers (TeamCity, Codeship, etc.) and some that don’t support natively have plugins (jenkins has a maven plugin)
1. Descriptive syntax for BDD paradigm
1. Very popular
1. Everything comes bundled

#### Cons
1. Asynchronous testing can be a bit of a headache
1. Expects a specific suffix to all test files (spec.js by default)
1. Everything comes bundled
1. Sparse console output

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
1. No dependencies, works with any unit testing framework.

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
1. Very popular and active community. Over 3,000 dependent npm packages, 4.7M downloads last month.
1. Simple setup
1. Headless running out of the box
1. Allows use of any assertion library that will throw exceptions on failure, such as Chai
1. Supported by some CI servers and plugins for others (jenkins has a maven plugin)
1. Has aliases for functions to be more BDD-oriented or TDD-oriented
1. Highly extensible
1. Asynchronous testing is a breeze

#### Cons
1. Newer to the field, so support might be lacking in certain areas
1. Runs all tests in one process. Shared resources -- no isolation.

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
1. Simple test syntax
1. Runs tests concurrently (or serially, if necessary)
1. Enforces writing atomic tests
1. No implicit globals
1. Isolated environment for each test file
1. Write your tests in ES2017
1. Promise support
1. Generator function support
1. Async function support
1. Observable support
1. Enhanced assertion messages
1. TAP reporter
1. Clean stack traces
1. Automatic migration from other test runners

#### Cons
1. Global space bugs could possibly be hard to debug, but there will be a (much) better chance they're discovered.
1. Since tests run in child processes, debugging tests requires a workaround:
`node --inspect node_modules/ava/profile.js some/test/file.js`
1. Opinionated -- first test argument must be named "t"
1. If you need to set up global state for each test (like spying on console.log for example), you'll need to make sure the tests are run serially

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
1. Popular -- over 2,400 dependent npm packages, 3.2M downloads last month.
1. Includes many assertions that you'd think should be part of core node assert module.
1. Can use should and/or expect for BDD style assertions

#### Cons
1. Verbose, e.g.: `expect(func).to.have.been.called.with(arg)`
1. Spies can be made with `chai-spies` plugin, but no support for stubs

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
