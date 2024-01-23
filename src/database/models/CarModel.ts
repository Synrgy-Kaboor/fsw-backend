import { Model, type ModelObject } from 'objection';

export class CarModel extends Model {
  id!: string;
  plate!: string;
  manufacture!: string;
  model!: string;
  image!: string;
  rent_per_day!: number;
  capacity!: number;
  description!: string;
  available_at!: Date;
  transmission!: string;
  available!: boolean;
  type!: string;
  year!: number;
  options!: string[];
  specs!: string[];
  creator_id!: string;
  last_updater_id!: string;
  deleter_id!: string;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'cars';
  }
}

export type Car = ModelObject<CarModel>;
