import { Model, type ModelObject } from 'objection';
import { PlaneClassModel } from './PlaneClassModel';

export class FlightPriceModel extends Model {
  id!: number;
  adult_price!: number;
  child_price!: number;
  baby_price!: number;

  flight_id!: number;
  plane_class_id!: number;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'flight_prices';
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static get relationMappings() {
    return {
      plane_class: {
        relation: Model.BelongsToOneRelation,
        modelClass: PlaneClassModel,
        join: {
          from: 'flight_prices.flight_id',
          to: 'plane_classes.id'
        }
      }
    }
  }
}

export type FlightPrice = ModelObject<FlightPriceModel>;
