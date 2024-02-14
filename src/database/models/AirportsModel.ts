import { Model, type ModelObject } from 'objection';

export class AirportModel extends Model {
  id!: number;
  code!: string;
  name!: string;
  timezone!: number;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'airports';
  }
}

export type Airport = ModelObject<AirportModel>;
