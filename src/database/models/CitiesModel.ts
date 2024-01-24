import { Model, type ModelObject } from 'objection';

export class CityModel extends Model {
  id!: number;
  code!: string;
  name!: string;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'cities';
  }
}

export type City = ModelObject<CityModel>;
