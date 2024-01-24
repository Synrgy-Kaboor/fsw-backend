import { Model, type ModelObject } from 'objection';

export class OrdererModel extends Model {
  id!: number;
  full_name!: string;
  title!: string;
  phone_number!: string;
  email!: string;

  booking_id!: number;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'orderers';
  }
}

export type Orderer = ModelObject<OrdererModel>;
