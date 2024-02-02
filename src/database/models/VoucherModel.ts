import { Model, type ModelObject } from 'objection';

export class VoucherModel extends Model {
  id!: number;
  code!: string;
  title!: string;
  description!: string;
  expired_time!: Date;
  eligible_payment_methods!: string[]
  maximum_discount!: number;

  flight_id!: number;
  plane_class_id!: number;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'vouchers';
  }
}

export type Voucher = ModelObject<VoucherModel>;
