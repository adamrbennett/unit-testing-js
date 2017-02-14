'use strict';

class CoffeeMaker {
  constructor() {
    this.waterProvider = null;
  }

  use(waterProvider) {
    this.waterProvider = waterProvider;
    return this;
  }

  grind() {
    return "coarse";
  }

  makeCoffee(taste, temp, waterType) {
    let water = "tap";
    if (waterType && this.waterProvider && this.waterProvider.supplyWater) {
      water = this.waterProvider.supplyWater(waterType);
    }
    let coffee = {
      taste: taste,
      temp: temp,
      water: water,
      grind: this.grind()
    }
    return coffee;
  }
}

module.exports = CoffeeMaker;
