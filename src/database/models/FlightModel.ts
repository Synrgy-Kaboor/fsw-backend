import { Model, type ModelObject } from 'objection';
import { BookingModel } from './BookingModel';
import { PlaneModel } from './PlanesModel';
import { AirportModel } from './AirportsModel';
import { FlightPriceModel } from './FlightPriceModel';

export class FlightModel extends Model {
  id!: number;
  departure_date_time!: Date;
  arrival_date_time!: Date;

  plane_id!: number;
  origin_airport_id!: number;
  destination_airport_id!: number;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'flights';
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static get relationMappings() {
    return {
      outbound_bookings: {
        relation: Model.HasManyRelation,
        modelClass: BookingModel,
        join: {
          from: 'flights.id',
          to: 'bookings.outbound_flight_id'
        }
      },
      return_bookings: {
        relation: Model.HasManyRelation,
        modelClass: BookingModel,
        join: {
          from: 'flights.id',
          to: 'bookings.return_flight_id'
        }
      },
      plane: {
        relation: Model.BelongsToOneRelation,
        modelClass: PlaneModel,
        join: {
          from: 'flights.plane_id',
          to: 'planes.id'
        }
      },
      origin_airport: {
        relation: Model.BelongsToOneRelation,
        modelClass: AirportModel,
        join: {
          from: 'flights.origin_airport_id',
          to: 'airports.id'
        }
      },
      destination_airport: {
        relation: Model.BelongsToOneRelation,
        modelClass: AirportModel,
        join: {
          from: 'flights.destination_airport_id',
          to: 'airports.id'
        }
      },
      flight_prices: {
        relation: Model.HasManyRelation,
        modelClass: FlightPriceModel,
        join: {
          from: 'flights.id',
          to: 'flight_prices.flight_id'
        }
      }
    }
  }
}

export type Flight = ModelObject<FlightModel>;
