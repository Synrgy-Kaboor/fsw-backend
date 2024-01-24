import { Model, type ModelObject } from 'objection';

export class PlaneClassModel extends Model {
  id!: number;
  class_code!: string;
  kuota!: number;

  plane_id!: number;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'plane_classes';
  }
}

export type PlaneClass = ModelObject<PlaneClassModel>;
