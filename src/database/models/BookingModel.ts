import { Model, type ModelObject } from 'objection';

export class BookingModel extends Model {
  id!: bigint;
  flight_id!: bigint;
  creator_id!: bigint;
  payment_id!: bigint;
  class_code!: string;
  add_baggage?: boolean;
  add_travel_insurance?: boolean;
  add_baggage_insurance?: boolean;
  add_delay_protection?: boolean;
  created_at!: Date;
  updated_at!: Date;
  expired_time!: Date;
  
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'Bookings';
  }
}

export type Booking = ModelObject<BookingModel>;
