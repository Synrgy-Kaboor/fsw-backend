import { Model, type ModelObject } from 'objection';

export class PaymentModel extends Model {
  id!: number;
  total_price!: number;
  expired_time!: Date;
  payment_method!: string;
  payment_completed!: boolean;
  payment_date_time!: Date;
  invoice_number!: string;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'payments';
  }
}

export type Payment = ModelObject<PaymentModel>;
