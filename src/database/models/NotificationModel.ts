import { Model, type ModelObject } from 'objection';

export class NotificationModel extends Model {
  id!: number;
  type!: string;
  title!: string;
  detail!: string;
  flag!: boolean;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;

  price_notification_id!: number;

  user_id!: number;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/class-literal-property-style
  static get tableName() {
    //eslint-disable-line
    return 'notifications';
  }
}

export type Notification = ModelObject<NotificationModel>;
