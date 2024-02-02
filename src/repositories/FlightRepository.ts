import { type Flight, FlightModel } from '@models/FlightModel';

export class FlightRepository {
  public async getFlight(id: number): Promise<Flight> {
    return await FlightModel.query()
      .findById(id)
      .withGraphFetched('[plane, origin_airport, destination_airport, flight_prices]')
      .throwIfNotFound();
  }
}