import { Model, type ModelObject } from 'objection';

export class PassportModel extends Model {
  id!: number;
  passport_number!: string;
  full_name!: string;
  expired_date!: Date;
  nation!: string;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;

  user_id!: number;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'passports';
  }
}

export type Passport = ModelObject<PassportModel>;
