import type { Car, CarModel } from '@models/CarModel';
import { CarRepository } from '@repositories/CarRepository';

export class CarService {
  private readonly carRepository = new CarRepository();

  public async getCars(
    limit: number,
    page: number,
    minimumCapacity: number,
    maximumCapacity: number,
    minimumAvailableDate?: Date,
  ): Promise<CarModel[]> {
    return await this.carRepository.getCars(
      limit,
      page,
      minimumCapacity,
      maximumCapacity,
      minimumAvailableDate,
    );
  }

  public async getCarById(id: string): Promise<CarModel> {
    return await this.carRepository.getCarById(id);
  }

  public async createCar(car: Partial<Car>, userId: string): Promise<CarModel> {
    return await this.carRepository.createCar(car, userId);
  }

  public async updateCar(
    id: string,
    car: Partial<Car>,
    userId: string,
  ): Promise<CarModel> {
    return await this.carRepository.updateCar(id, car, userId);
  }

  public async deleteCar(id: string, userId: string): Promise<CarModel> {
    return await this.carRepository.deleteCar(id, userId);
  }
}
