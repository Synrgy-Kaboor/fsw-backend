import { AirportModel, type Airport } from '@models/AirportsModel';

export class AirportRepository {
  public async getAirports(): Promise<Airport[]> {
    return await AirportModel.query().select('*');
  }

  public async getAirportByCode(code: string): Promise<Airport> {
    return await AirportModel.query()
      .findOne({
        code
      })
      .throwIfNotFound();
  }

  public async createAirport(airport: Partial<Airport>): Promise<void> {
    await AirportModel.query().insert(airport);
  }
}