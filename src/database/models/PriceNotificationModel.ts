import { Model, type ModelObject } from 'objection';
import { type Airport, AirportModel } from './AirportsModel';
import { type User } from './UserModel';

export class FlightModel extends Model {
  id!: number;
  total_adult!: number;
  total_children!: number;
  total_baby!: number;
  class_code!: string;
  minimum_price!: number;
  maximum_price!: number;
  departure_date_time!: Date;
  arrival_date_time!: Date;

  origin_airport_id!: number;
  destination_airport_id!: number;
  user_id!: number

  origin_airport!: Partial<Airport>;
  destination_airport!: Partial<Airport>;
  user!: Partial<User>


  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'flights';
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static get relationMappings() {
    return {
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
      }
    }
  }
}

export type Flight = ModelObject<FlightModel>;
