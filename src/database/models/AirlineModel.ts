import { Model, type ModelObject } from 'objection';

export class AirlineModel extends Model {
  id!: number;
  name!: string;
  image_url!: string;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'airlines';
  }
}

export type Airline = ModelObject<AirlineModel>;
