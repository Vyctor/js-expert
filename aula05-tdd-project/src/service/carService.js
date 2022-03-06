const BaseRepository = require("../repository/base/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
  }

  async getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(Math.random() * listLength);
  }

  async chooseRandomCar(carCategory) {
    const randomCarIndex = await this.getRandomPositionFromArray(
      carCategory.carIds
    );
    return carCategory.carIds[randomCarIndex];
  }

  async getAvailableCar(carCategory) {
    const carId = await this.chooseRandomCar(carCategory);
    return this.carRepository.find(carId);
  }
}

module.exports = CarService;
