import {
  type Notification,
  NotificationModel,
} from '@models/NotificationModel';
import { UserModel } from '@models/UserModel';

export class NotificationRepository {
  public async createNotification(
    notification: Partial<Notification>,
  ): Promise<Notification> {
    return await NotificationModel.query().insert(notification);
  }

  public async getNotificationByEmail(email: string): Promise<Notification[]> {
    const user = await UserModel.query()
      .where('email', email)
      .select('id')
      .first()
      .throwIfNotFound();
    return await NotificationModel.query().where({
      user_id: user.id,
      deleted_at: null,
    });
  }

  public async markReadNotificationById(id: number): Promise<Notification> {
    return await NotificationModel.query()
      .patch({ flag: true, updated_at: new Date() })
      .where('id', id)
      .returning('*')
      .first()
      .throwIfNotFound();
  }

  public async deleteNotificationById(id: number): Promise<Notification> {
    return await NotificationModel.query()
      .patch({ deleted_at: new Date() })
      .where('id', id)
      .returning('*')
      .first()
      .throwIfNotFound();
  }
}
