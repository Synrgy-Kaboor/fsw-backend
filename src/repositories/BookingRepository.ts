import { type Booking, BookingModel } from '@models/BookingModel';
import { raw } from 'objection';
export class BookingRepository {
  public async createBooking(booking: Partial<Booking>): Promise<void> {
    // Create booking
    await BookingModel.transaction(async trx => {
      await BookingModel.query(trx).insertGraph(booking);
    });
  }

  public async getNumberOfBookedSeats(flightId: number, classCode: string): Promise<number> {
    interface SeatsOccupied {
      adults: number;
      children: number;
    }
    
    const res: SeatsOccupied = (await BookingModel.query()
      .select(
        raw('coalesce(sum(??), 0)', 'total_adult').as('adults'),
        raw('coalesce(sum(??), 0)', 'total_children').as('children'))
      .where('outbound_flight_id', flightId)
      .orWhere('return_flight_id', flightId)
      .andWhere('class_code', classCode)
      .join('payments', 'bookings.payment_id', 'payments.id')
      .where('payments.payment_completed', true)
      .orWhere('payments.expired_time', '>', new Date())
    )[0] as unknown as SeatsOccupied;

    return Number(res.adults) + Number(res.children);
  }

  public async getBooking(id: number): Promise<Booking> {
    return await BookingModel.query()
      .findById(id)
      .withGraphFetched([
        'orderer', 
        'passengers', 
        'payment', 
        'outbound_flight',
        'return_flight',
        'voucher'
      ])
      .throwIfNotFound();
  }

  public async getBookingsOfUser(userId: number): Promise<Booking[]> {
    return await BookingModel.query()
      .where('creator_id', userId)
      .withGraphFetched('payment');
  }
}