import { Model, type ModelObject } from 'objection';
import { type Orderer, OrdererModel } from './OrdererModel';
import { type Passenger, PassengerModel } from './PassengerModel';
import { type Payment, PaymentModel } from './PaymentModel';
import { type Flight, FlightModel } from './FlightModel';
import { type Voucher, VoucherModel } from './VoucherModel';

export class BookingModel extends Model {
  id!: number;
  total_adult!: number;
  total_children!: number;
  total_baby!: number;
  class_code!: string;
  add_baggage!: boolean;
  add_travel_insurance!: boolean;
  add_baggage_insurance!: boolean;
  add_delay_protection!: boolean;
  proof_of_payment_file_name!: string;
  outbound_ticket_file_name!: string;
  return_ticket_file_name!: string;
  booking_code!: string;

  outbound_flight_id!: number;
  return_flight_id!: number;
  creator_id!: number;
  payment_id!: number;
  voucher_id!: number;

  orderer!: Partial<Orderer>;
  passengers!: Array<Partial<Passenger>>;
  payment!: Partial<Payment>;
  outbound_flight!: Partial<Flight>;
  return_flight!: Partial<Flight>;
  voucher!: Partial<Voucher>;

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
      },
      voucher: {
        relation: Model.BelongsToOneRelation,
        modelClass: VoucherModel,
        join: {
          from: 'bookings.voucher_id',
          to: 'vouchers.id'
        }
      }
    }
  }
}

export type Booking = ModelObject<BookingModel>;
