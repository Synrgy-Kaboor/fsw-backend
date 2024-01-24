import { Model, type ModelObject } from 'objection';
import { PaymentMethodModel } from './PaymentMethodModel';

export class PaymentModel extends Model {
  id!: number;
  total_price!: number;
  expired_time!: Date;
  payment_completed!: boolean;
  payment_date_time!: Date;
  invoice_number!: string;

  payment_method_id!: number;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'payments';
  }

  static get relationMappings() {
    return {
      payment_method: {
        relation: Model.BelongsToOneRelation,
        modelClass: PaymentMethodModel,
        join: {
          from: 'payments.payment_method_id',
          to: 'payment_methods.id'
        }
      }
    }
  }
}

export type Payment = ModelObject<PaymentModel>;
