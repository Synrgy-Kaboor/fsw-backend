import { Model, type ModelObject } from 'objection';

export class PassengerModel extends Model {
  id!: number;
  full_name!: string;
  title!: string;

  booking_id!: string;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'passengers';
  }
}

export type Passenger = ModelObject<PassengerModel>;
