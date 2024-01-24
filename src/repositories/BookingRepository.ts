import { type Booking, BookingModel } from '@models/BookingModel';

export class CarRepository {
  public async createBooking (
    booking : Partial<Booking>, creator_id: bigint
  ): Promise<BookingModel>{
    try {
        const checkBooking = await BookingModel.query()
    } catch (error) {
        
    }
  }
}
