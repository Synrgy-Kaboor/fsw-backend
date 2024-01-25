import { Model, type ModelObject } from 'objection';
import { OrdererModel } from './OrdererModel';
import { PassengerModel } from './PassengerModel';
import { PaymentModel } from './PaymentModel';
import { FlightModel } from './FlightModel';

export class BookingModel extends Model {
  id!: number;
  class_code!: string;
  add_baggage!: boolean;
  add_travel_insurance!: boolean;
  add_baggage_insurace!: boolean;
  add_delay_protection!: boolean;
  expired_time!: Date;

  outbound_flight_id!: number;
  return_flight_id!: number;
  creator_id!: number;
  payment_id!: number;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'bookings';
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static get relationMappings() {
    return {
      orderer: {
        relation: Model.HasOneRelation,
        modelClass: OrdererModel,
        join: {
          from: 'bookings.id',
          to: 'orderers.booking_id'
        }
      },
      passengers: {
        relation: Model.HasManyRelation,
        modelClass: PassengerModel,
        join: {
          from: 'bookings.id',
          to: 'passengers.booking_id'
        }
      },
      payment: {
        relation: Model.BelongsToOneRelation,
        modelClass: PaymentModel,
        join: {
          from: 'bookings.payment_id',
          to: 'payments.id'
        }
      },
      outbound_flight: {
        relation: Model.BelongsToOneRelation,
        modelClass: FlightModel,
        join: {
          from: 'bookings.outbound_flight_id',
          to: 'flights.id'
        }
      },
      return_flight: {
        relation: Model.BelongsToOneRelation,
        modelClass: FlightModel,
        join: {
          from: 'bookings.return_flight_id',
          to: 'flights.id'
        }
      }
    }
  }
}

export type Booking = ModelObject<BookingModel>;
