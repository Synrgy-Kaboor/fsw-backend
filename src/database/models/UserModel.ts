import { Model, type ModelObject } from 'objection';
import { type Booking, BookingModel } from './BookingModel';
import { type Passport, PassportModel } from './PassportModel';
import { type Notification, NotificationModel } from './NotificationModel';

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
  incoming_email_change!: string;
  email_otp!: string;
  incoming_nohp_change!: string;
  nik!: string;
  image_name!: string;
  nohp_otp!: string;
  created_at!: Date;
  updated_at!: Date;

  bookings!: Array<Partial<Booking>>;
  passports!: Array<Partial<Passport>>;
  notifications!: Array<Partial<Notification>>;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'users';
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static get relationMappings() {
    return {
      bookings: {
        relation: Model.HasManyRelation,
        modelClass: BookingModel,
        join: {
          from: 'users.id',
          to: 'bookings.creator_id'
        }
      },
      passports: {
        relation: Model.HasManyRelation,
        modelClass: PassportModel,
        join: {
          from: 'users.id',
          to: 'passports.user_id'
        }
      },
      notifications: {
        relation: Model.HasManyRelation,
        modelClass: NotificationModel,
        join: {
          from: 'users.id',
          to: 'notifications.user_id'
        }
      }
    }
  }
}

export type User = ModelObject<UserModel>;
