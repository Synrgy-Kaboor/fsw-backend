import { Model, type ModelObject } from 'objection';

export class PaymentMethodModel extends Model {
  id!: number;
  method_name!: string;
  image_url!: string;
  account_number!: string;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'payment_methods';
  }
}

export type PaymentMethod = ModelObject<PaymentMethodModel>;
