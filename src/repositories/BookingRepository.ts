import { type Booking, BookingModel } from '@models/BookingModel';
import { PaymentModel } from '@models/PaymentModel';
import { raw } from 'objection';
export class BookingRepository {
  public async createBooking(booking: Partial<Booking>): Promise<number> {
    // Create booking
    const insertedBooking = await BookingModel.transaction(async trx => {
      return await BookingModel.query(trx).insertGraph(booking).returning('id');
    });

    return Number(insertedBooking.id);
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
      .withGraphFetched('[orderer, passengers, payment, outbound_flight.[plane.[airline], origin_airport, destination_airport], return_flight.[plane.[airline], origin_airport, destination_airport]]')
      .throwIfNotFound();
  }

  public async getBookingsOfUser(userId: number): Promise<Booking[]> {
    return await BookingModel.query()
      .where('creator_id', userId)
      .withGraphFetched('[payment, outbound_flight.[plane.[airline], origin_airport, destination_airport], return_flight.[plane.[airline], origin_airport, destination_airport]]');
  }

  public async addProofOfPaymentFilename(id: number, filename: string): Promise<void> {
    await BookingModel.query()
      .findById(id)
      .patch({
        proof_of_payment_file_name: filename
      })
      .throwIfNotFound();
  }

  public async finalizeBooking(id: number, outboundTicketFilename: string, returnTicketFilename: string): Promise<void> {
    await BookingModel.transaction(async trx => {
      const booking = await BookingModel.query(trx)
      .patchAndFetchById(id, {
        outbound_ticket_file_name: outboundTicketFilename,
        return_ticket_file_name: returnTicketFilename,
      })
      .throwIfNotFound();

      await PaymentModel.query(trx)
      .findById(booking.payment_id)
      .patch({
        payment_completed: true
      });
    })
  }
}