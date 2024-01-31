import { Model, type ModelObject } from 'objection';
import { type Airline, AirlineModel } from './AirlineModel';

export class PlaneModel extends Model {
  id!: number;
  code!: string;
  name!: string;
  capacity_economy!: number;
  capacity_economy_premium!: number;
  capacity_business!: number;
  capacity_first_class!: number;

  airline_id!: number;
  
  airline!: Airline;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'planes';
  }
  
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static get relationMappings() {
    return {
      airline: {
        relation: Model.BelongsToOneRelation,
        modelClass: AirlineModel,
        join: {
          from: 'planes.airline_id',
          to: 'airlines.id'
        }
      }
    }
  }
}

export type Plane = ModelObject<PlaneModel>;
