'use strict';

const assert = require('assert');
const sinon = require('sinon');
const CoffeeMaker = require('../app/coffeeMaker');
let coffeeMaker = new CoffeeMaker();

describe("coffee maker", () => {

  it("should give us coffee", () => {
    // basic assertions
    let coffee = coffeeMaker.makeCoffee();
    assert.notEqual(coffee, undefined);
    assert.notEqual(coffee, null);
  });

  it("should make good coffee", () => {
    // value matching
    let coffee = coffeeMaker.makeCoffee("good");
    assert.equal(coffee.taste, "good");
  });

  it("should make hot coffee", () => {
    // value matching
    let coffee = coffeeMaker.makeCoffee("good", "hot");
    assert.equal(coffee.temp, "hot");
  });

  it("should never make bad coffee", () => {
    // intentionally fails
    let coffee = coffeeMaker.makeCoffee("bad");
    assert.equal(coffee.taste, "good");
  });

  it("should use fresh water", () => {
    // sinon spy example
    let freshWaterProvider = {
      supplyWater: sinon.spy()
    };

    let coffee = coffeeMaker.use(freshWaterProvider).makeCoffee("good", "hot", "fresh");
    sinon.assert.calledWith(freshWaterProvider.supplyWater, "fresh");
  });

  it("should use fine grind", () => {
    // sinon stub example
    coffeeMaker.grind = sinon.stub();
    coffeeMaker.grind.returns("fine");

    let coffee = coffeeMaker.makeCoffee("good", "hot", "fresh");
    assert.equal(coffee.grind, "fine");
  });
});
