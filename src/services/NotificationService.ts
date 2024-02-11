import { NotificationRepository } from '@repositories/NotificationRepository';
import { type Notification } from '@models/NotificationModel';
import { type PriceNotification } from '@models/PriceNotificationModel';
import { UserRepository } from '@repositories/UserRepository';
import { PriceNotificationRepository } from '@repositories/PriceNotificationRepository';

export class NotificationService {
  private readonly notificationRepository = new NotificationRepository();
  private readonly priceNotificationRepository = new PriceNotificationRepository();
  private readonly userRepository = new UserRepository();

  public async getNotificationByEmail(email: string): Promise<Notification[]> {
    return await this.notificationRepository.getNotificationByEmail(email);
  }

  public async markReadNotificationById(id: number): Promise<Notification> {
    return await this.notificationRepository.markReadNotificationById(id);
  }

  public async deleteNotificationById(id: number): Promise<Notification> {
    return await this.notificationRepository.deleteNotificationById(id);
  }


  public async getPriceNotificationByEmail(email: string): Promise<PriceNotification[]> {
    const userId = await this.userRepository.getUserIdByEmail(email);
    
    return await this.priceNotificationRepository.getPriceNotifications(userId);
  }

  public async createPriceNotification(email: string, pn: Partial<PriceNotification>): Promise<void> {
    const userId = await this.userRepository.getUserIdByEmail(email);

    pn.user_id = userId;

    await this.priceNotificationRepository.createPriceNotification(pn);
  }

  public async updatePriceNotification(id: number, pn: Partial<PriceNotification>): Promise<void> {
    await this.priceNotificationRepository.updatePriceNotification(id, pn);
  }

  public async deletePriceNotification(id: number): Promise<void> {
    await this.priceNotificationRepository.deletePriceNotification(id);
  }
}
