import { type PriceNotification, PriceNotificationModel } from '@models/PriceNotificationModel';

export class PriceNotificationRepository {
  public async getPriceNotifications(userId: number): Promise<PriceNotification[]> {
    return await PriceNotificationModel.query()
      .where({
        user_id: userId,
        deleted_at: null,
      })
      .andWhere('date', '>', new Date())
      .withGraphFetched('[origin_airport, destination_airport]');
  }

  public async createPriceNotification(pn: Partial<PriceNotification>,): Promise<void> {
    await PriceNotificationModel.query().insert(pn);
  }

  public async updatePriceNotification(id: number, pn: Partial<PriceNotification>): Promise<void> {
    await PriceNotificationModel.query()
      .patch(pn)
      .where('id', id)
      .first()
      .throwIfNotFound();
  }

  public async deletePriceNotification(id: number): Promise<void> {
    await PriceNotificationModel.query()
      .patch({ deleted_at: new Date() })
      .where('id', id)
      .first()
      .throwIfNotFound();
  }
}
