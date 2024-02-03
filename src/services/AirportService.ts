import { type Airport } from '@models/AirportsModel';
import { AirportRepository } from '@repositories/AirportRepository';

export class AirportService {
  private readonly airportRepository = new AirportRepository();

  public async getAirports(): Promise<Airport[]> {
    return await this.airportRepository.getAirports();
  }

  public async createAirport(airport: Partial<Airport>): Promise<void> {
    await this.airportRepository.createAirport(airport);
  }
}