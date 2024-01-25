import { Model, type ModelObject } from 'objection';
import { CityModel } from './CitiesModel';

export class AirportModel extends Model {
  id!: number;
  code!: string;
  name!: string;
  timezone!: number;

  city_id!: number;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'airports';
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static get relationMappings() {
    return {
      city: {
        relation: Model.BelongsToOneRelation,
        modelClass: CityModel,
        join: {
          from: 'airports.city_id',
          to: 'cities.id'
        }
      }
    }
  }
}

export type Airport = ModelObject<AirportModel>;
