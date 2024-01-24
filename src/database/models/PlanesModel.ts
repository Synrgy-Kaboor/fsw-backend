import { Model, type ModelObject } from 'objection';
import { PlaneClassModel } from './PlaneClassModel';
import { AirlineModel } from './AirlineModel';

export class PlaneModel extends Model {
  id!: number;
  code!: string;
  name!: string;

  airline_id!: number;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'planes';
  }

  static get relationMappings() {
    return {
      plane_classes: {
        relation: Model.HasManyRelation,
        modelClass: PlaneClassModel,
        join: {
          from: 'planes.id',
          to: 'plane_classes.plane_id'
        }
      },
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
