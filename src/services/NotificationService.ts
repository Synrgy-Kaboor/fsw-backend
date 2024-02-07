import { NotificationRepository } from '@repositories/NotificationRepository';
import { type Notification } from '@models/NotificationModel';

export class NotificationService {
  private readonly notificationRepository = new NotificationRepository();
  public async getNotificationByEmail(email: string): Promise<Notification[]> {
    return await this.notificationRepository.getNotificationByEmail(email);
  }

  public async markReadNotificationById(id: number): Promise<Notification> {
    return await this.notificationRepository.markReadNotificationById(id);
  }

  public async deleteNotificationById(id: number): Promise<Notification> {
    return await this.notificationRepository.deleteNotificationById(id);
  }
}
