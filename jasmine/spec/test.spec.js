'use strict';

const CoffeeMaker = require('../../app/coffeeMaker');
let coffeeMaker = new CoffeeMaker();

describe("coffee maker", () => {

  it("should give us coffee", () => {
    // basic assertions
    let coffee = coffeeMaker.makeCoffee();
    expect(coffee).not.toBeUndefined();
    expect(coffee).not.toBeNull();
  });

  it("should make good coffee", () => {
    // value matching
    let coffee = coffeeMaker.makeCoffee("good");
    expect(coffee.taste).toMatch("good");
  });

  it("should make hot coffee", () => {
    // value matching
    let coffee = coffeeMaker.makeCoffee("good", "hot");
    expect(coffee.temp).toMatch("hot");
  });

  it("should never make bad coffee", () => {
    // intentionally fails
    let coffee = coffeeMaker.makeCoffee("bad");
    expect(coffee.taste).toMatch("good");
  });

  it("should use fresh water", () => {
    // spy example
    let freshWaterProvider = {
      supplyWater: (type) => {
        return type;
      }
    };

    spyOn(freshWaterProvider, "supplyWater");

    let coffee = coffeeMaker.use(freshWaterProvider).makeCoffee("good", "hot", "fresh");
    expect(freshWaterProvider.supplyWater).toHaveBeenCalledWith("fresh");
  });

  it("should use fine grind", () => {
    // stub example
    spyOn(coffeeMaker, "grind").and.returnValue("fine");

    let coffee = coffeeMaker.makeCoffee("good", "hot", "fresh");
    expect(coffee.grind).toMatch("fine");
  });
});
