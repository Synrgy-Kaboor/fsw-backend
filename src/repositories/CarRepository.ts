import { type Car, CarModel } from '@models/CarModel';

export class CarRepository {
  public async getCars(
    limit: number,
    page: number,
    minimumCapacity: number,
    maximumCapacity: number,
    minimumAvailableDate?: Date,
  ): Promise<CarModel[]> {
    let query = CarModel.query()
      .select('*')
      .whereBetween('capacity', [minimumCapacity, maximumCapacity])
      .where({
        deleted_at: null,
      })
      .page(page, limit);

    if (minimumAvailableDate) {
      query = query.where('available_at', '<=', minimumAvailableDate);
    }

    return (await query).results;
  }

  public async getCarById(id: string): Promise<CarModel> {
    return await CarModel.query()
      .select('*')
      .findById(id)
      .where({
        deleted_at: null,
      })
      .throwIfNotFound();
  }

  public async createCar(car: Partial<Car>, userId: string): Promise<CarModel> {
    return await CarModel.query()
      .insert({
        ...car,
        ...{
          creator_id: userId,
          last_updater_id: userId,
        },
      })
      .returning('*');
  }

  public async updateCar(
    id: string,
    car: Partial<Car>,
    userId: string,
  ): Promise<CarModel> {
    return await CarModel.query()
      .patchAndFetchById(id, {
        ...car,
        ...{
          last_updater_id: userId,
        },
      })
      .where({
        deleted_at: null,
      })
      .throwIfNotFound()
      .returning('*');
  }

  public async deleteCar(id: string, userId: string): Promise<CarModel> {
    return await CarModel.query()
      .patchAndFetchById(id, { deleted_at: new Date(), deleter_id: userId })
      .where({
        deleted_at: null,
      })
      .throwIfNotFound()
      .returning('*');
  }
}
