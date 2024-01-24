import { Model, type ModelObject } from 'objection';

export class UserModel extends Model {
  id!: number;
  email!: string;
  full_name!: string;
  password!: string;
  phone_number!: string;
  role!: string;
  otp!: string;
  verified!: boolean;
  verified_deadlines!: number;
  request_for_change_password!: boolean;
  forget_password_verify_deadlines!: number;
  title!: string;
  gender!: string;
  birth_day!: Date;
  nation!: string;
  city!: string;
  address!: string;
  is_wni!: boolean;
  created_at!: Date;
  updated_at!: Date;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'users';
  }
}

export type User = ModelObject<UserModel>;
