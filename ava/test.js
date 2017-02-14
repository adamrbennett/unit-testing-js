import test from 'ava';
import sinon from 'sinon';
import CoffeeMaker from '../app/coffeeMaker';

let coffeeMaker = new CoffeeMaker();

test("should give us coffee", t => {
  // basic assertions
  let coffee = coffeeMaker.makeCoffee();
  t.not(coffee, undefined);
  t.not(coffee, null);
});

test("should make good coffee", t => {
  // value matching
  let coffee = coffeeMaker.makeCoffee("good");
  t.is(coffee.taste, "good")
});

test("should make hot coffee", t => {
  // value matching
  let coffee = coffeeMaker.makeCoffee("good", "hot");
  t.is(coffee.temp, "hot");
});

test("should never make bad coffee", t => {
  // intentionally fails
  let coffee = coffeeMaker.makeCoffee("bad");
  t.is(coffee.taste, "good");
});

test("should use fresh water", t => {
  // sinon spy example
  let freshWaterProvider = {
    supplyWater: sinon.spy()
  };

  let coffee = coffeeMaker.use(freshWaterProvider).makeCoffee("good", "hot", "fresh");
  sinon.assert.calledWith(freshWaterProvider.supplyWater, "fresh");
});

test("should use fine grind", t => {
  // sinon stub example
  coffeeMaker.grind = sinon.stub();
  coffeeMaker.grind.returns("fine");

  let coffee = coffeeMaker.makeCoffee("good", "hot", "fresh");
  t.is(coffee.grind, "fine");
});
