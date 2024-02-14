import { type Flight, FlightModel } from '@models/FlightModel';
import { type Plane } from '@models/PlanesModel';
import { raw } from 'objection';

class GetFlightsResult extends FlightModel {
  total_outbound!: number;
  total_return!: number;
}

export class FlightRepository {
  public async getFlights(
    originAirportId: number, 
    destinationAirportId: number, 
    minDate: Date, 
    maxDate: Date,
    requiredCapacity:number, 
    classCode: string): Promise<Flight[]> 
  {
    const queryResults = await FlightModel.query()
      .select(
        'flights.*',
        FlightModel.relatedQuery('outbound_bookings').sum(raw('total_adult + total_children')).as('total_outbound'),
        FlightModel.relatedQuery('return_bookings').sum(raw('total_adult + total_children')).as('total_return'),
      )
      .where('origin_airport_id', originAirportId)
      .andWhere('destination_airport_id', destinationAirportId)
      .andWhere('departure_date_time', '>=', minDate)
      .andWhere('departure_date_time', '<=', maxDate)
      .withGraphFetched('[plane.[airline], flight_prices, origin_airport, destination_airport]')
      .modifyGraph('flight_prices', builder => {
        void builder.where('class_code', classCode);
      }) as GetFlightsResult[];

    const res: Flight[] = [];

    for (const r of queryResults) {
      if (Number(r.total_outbound) + Number(r.total_return) + requiredCapacity <= this.getCapacity(r.plane, classCode)) {
        res.push(r);
      }
    }

    return res;
  }

  public async getFlight(id: number, classCode: string): Promise<Flight> {
    return await FlightModel.query()
      .findById(id)
      .withGraphFetched('[plane.[airline], origin_airport, destination_airport, flight_prices]')
      .modifyGraph('flight_prices', builder => {
        void builder.where('class_code', classCode);
      })
      .throwIfNotFound();
  }

  public async addFlight(flight: Partial<Flight>): Promise<Flight> {
    return await FlightModel.query().insertGraph(flight);
  }

  private getCapacity(plane: Partial<Plane>, classCode: string): number {
    switch(classCode) {
      case 'E': 
        return plane.capacity_economy ?? 0;
      case 'EP':
        return plane.capacity_economy_premium ?? 0;
      case 'B':
        return plane.capacity_business ?? 0;
      case 'F':
        return plane.capacity_first_class ?? 0;
      default:
        throw new Error('Invalid Class Code!');
    }
  }
}