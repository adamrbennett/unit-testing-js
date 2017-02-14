'use strict';

const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

let assert = chai.assert;
let expect = chai.expect;

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
    // chai spy example
    let freshWaterProvider = {
      supplyWater: chai.spy()
    };

    let coffee = coffeeMaker.use(freshWaterProvider).makeCoffee("good", "hot", "fresh");
    expect(freshWaterProvider.supplyWater).to.have.been.called.with("fresh");
  });

  it("should use fine grind", () => {
    // chai stub example -- chai cannot stub :(

    // coffeeMaker.grind = chai.stub();
    // coffeeMaker.grind.returns("fine");
    //
    // let coffee = coffeeMaker.makeCoffee("good", "hot", "fresh");
    // assert.equal(coffee.grind, "fine");
  });
});
