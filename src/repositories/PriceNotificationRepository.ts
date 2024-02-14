import { type Flight } from '@models/FlightModel';
import { type PriceNotification, PriceNotificationModel } from '@models/PriceNotificationModel';
import { utcDatetimeToTimezoneDate } from '@utils/dateUtils';

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

  public async getRelevantPriceNotification(flight: Partial<Flight>): Promise<PriceNotification[]> {
    if (flight.departure_date_time && flight.origin_airport?.timezone) {
      const date = utcDatetimeToTimezoneDate(flight.departure_date_time, flight.origin_airport?.timezone);
    
      return await PriceNotificationModel.query()
        .where({
          deleted_at: null,
          origin_airport_id: flight.origin_airport_id,
          destination_airport_id: flight.destination_airport_id,
          date
      });
    } else {
      throw new Error()
    }
  }
}
