import { Model, type ModelObject } from 'objection';

export class FlightPriceModel extends Model {
  id!: number;
  class_code!: string;
  adult_price!: number;
  child_price!: number;
  baby_price!: number;

  flight_id!: number;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'flight_prices';
  }
}

export type FlightPrice = ModelObject<FlightPriceModel>;
