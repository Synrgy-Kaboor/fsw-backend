import { Model, type ModelObject } from 'objection';
import { type Airport, AirportModel } from './AirportsModel';
import { type User } from './UserModel';

export class PriceNotificationModel extends Model {
  id!: number;
  total_adult!: number;
  total_children!: number;
  total_baby!: number;
  class_code!: string;
  minimum_price!: number;
  maximum_price!: number;
  date!: Date;

  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;

  origin_airport_id!: number;
  destination_airport_id!: number;
  user_id!: number

  origin_airport!: Partial<Airport>;
  destination_airport!: Partial<Airport>;
  user!: Partial<User>


  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'price_notifications';
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static get relationMappings() {
    return {
      origin_airport: {
        relation: Model.BelongsToOneRelation,
        modelClass: AirportModel,
        join: {
          from: 'price_notifications.origin_airport_id',
          to: 'airports.id'
        }
      },
      destination_airport: {
        relation: Model.BelongsToOneRelation,
        modelClass: AirportModel,
        join: {
          from: 'price_notifications.destination_airport_id',
          to: 'airports.id'
        }
      }
    }
  }
}

export type PriceNotification = ModelObject<PriceNotificationModel>;
