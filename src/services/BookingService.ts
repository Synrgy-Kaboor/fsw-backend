import { BAGGAGE_INSURANCE_PRICE, DELAY_PROTECTION_PRICE, EXTRA_BAGGAGE_PRICE, TRAVEL_INSURANCE_PRICE } from '@constants/prices';
import { type Booking } from '@models/BookingModel';
import { type Flight } from '@models/FlightModel';
import { type FlightPrice } from '@models/FlightPriceModel';
import { type Plane } from '@models/PlanesModel';
import { type Voucher } from '@models/VoucherModel';
import { BookingRepository } from '@repositories/BookingRepository';
import { FlightRepository } from '@repositories/FlightRepository';
import { UserRepository } from '@repositories/UserRepository';
import { VoucherRepository } from '@repositories/VoucherRepository';
import { addHours } from '@utils/dateUtils';

export class BookingService {
  private readonly bookingRepository = new BookingRepository();
  private readonly flightRepository = new FlightRepository();
  private readonly userRepository = new UserRepository();
  private readonly voucherRepository = new VoucherRepository();

  public async createBooking(booking: Partial<Booking>, creatorEmail: string): Promise<void> {
    if (!booking.outbound_flight_id || !booking.class_code || !booking.payment) {
      throw new Error();
    }

    // Check if voucher is valid
    let voucher: Voucher | null = null;
    if (booking.voucher_id) {
      voucher = await this.voucherRepository.getVoucher(booking.voucher_id);

      if (voucher.expired_time < new Date()) {
        throw new Error('Voucher Expired!');
      }
    }

    // Check if outbound flight is still available
    const outboundFlight = await this.flightRepository.getFlight(
      booking.outbound_flight_id
    );
    const numberOfBookedOutboundFlight = await this.bookingRepository.getNumberOfBookedSeats(
      booking.outbound_flight_id,
      booking.class_code
    );
    if (this.getCapacity(outboundFlight.plane, booking.class_code) 
      <= numberOfBookedOutboundFlight + (booking.total_adult ?? 0) + (booking.total_children ?? 0)) 
    {
      throw new Error('Outbound flight out of capacity!');
    }


    let returnFlight: Flight | null = null;

    if (booking.return_flight_id) {
      // Check if return flight is still available
      returnFlight = await this.flightRepository.getFlight(
        booking.return_flight_id
      );
      const numberOfBookedReturnFlight = await this.bookingRepository.getNumberOfBookedSeats(
        booking.return_flight_id,
        booking.class_code
      );
      if (this.getCapacity(returnFlight.plane, booking.class_code) 
        <= numberOfBookedReturnFlight + (booking.total_adult ?? 0) + (booking.total_children ?? 0)) 
      {
        throw new Error('Return flight out of capacity!');
      }
    }
    
    // Set creatorId
    booking.creator_id = await this.userRepository.getUserIdByEmail(creatorEmail);

    // Set payment details
    const currentDate = new Date();
    booking.payment.total_price = this.calculatePrice(booking, outboundFlight, returnFlight, voucher)
    booking.payment.expired_time = addHours(currentDate, 3);
    booking.payment.payment_completed = false;
    booking.payment.invoice_number = 
      'IV' + 
      currentDate.getFullYear() + 
      currentDate.getMonth() + 
      currentDate.getDay() + 
      Math.random().toString(36).substring(2,7);

    // Insert booking
    await this.bookingRepository.createBooking(booking);
  }


  public async getBooking(id: number): Promise<Booking> {
    return await this.bookingRepository.getBooking(id);
  }


  public async getBookings(email: string): Promise<Booking[]> {
    const userId = await this.userRepository.getUserIdByEmail(email);

    return await this.bookingRepository.getBookingsOfUser(userId);
  }


  private getCapacity(plane: Partial<Plane>, classCode: string): number {
    switch(classCode) {
      case 'E': 
        return plane.capacity_economy ?? 0;
      case 'EP':
        return plane.capacity_economy_premium ?? 0;
      case 'B':
        return plane.capacity_business ?? 0;
      case 'F':
        return plane.capacity_first_class ?? 0;
      default:
        throw new Error('Invalid Class Code!');
    }
  }

  private calculatePrice(
    booking: Partial<Booking>, 
    outboundFlight: Flight, 
    returnFlight: Flight | null, 
    voucher: Voucher | null): number 
  {
    if (!booking.class_code) throw new Error();

    // Get prices per seat for each flight
    const outboundFlightPrices = this.getFlightPrice(outboundFlight, booking.class_code);
    const returnFlightPrices = this.getFlightPrice(returnFlight, booking.class_code);

    // Calculate additional cost per person
    const additionalPerPerson = (booking.add_baggage ? EXTRA_BAGGAGE_PRICE : 0)
      + (booking.add_travel_insurance ? TRAVEL_INSURANCE_PRICE : 0)
      + (booking.add_baggage_insurance ? BAGGAGE_INSURANCE_PRICE : 0)
      + (booking.add_delay_protection ? DELAY_PROTECTION_PRICE : 0);

    // Calculate total for each flight
    const outboundTotal = (booking.total_adult ?? 0) * ((outboundFlightPrices.adult_price ?? 0) + additionalPerPerson)
      + (booking.total_children ?? 0) * ((outboundFlightPrices.child_price ?? 0) + additionalPerPerson)
      + (booking.total_baby ?? 0) * ((outboundFlightPrices.baby_price ?? 0) + additionalPerPerson)
    
    let returnTotal = 0;
    if (returnFlight) {
      returnTotal = (booking.total_adult ?? 0) * ((returnFlightPrices.adult_price ?? 0) + additionalPerPerson)
        + (booking.total_children ?? 0) * ((returnFlightPrices.child_price ?? 0) + additionalPerPerson)
        + (booking.total_baby ?? 0) * ((returnFlightPrices.baby_price ?? 0) + additionalPerPerson)
    }

    // Calculate net after voucher
    if (voucher) {
      return Math.max(outboundTotal + returnTotal - voucher.maximum_discount, 0);
    } else {
      return outboundTotal + returnTotal;
    }
  }

  private getFlightPrice(flight: Flight | null, classCode: string): Partial<FlightPrice> {
    if (flight != null) {
      for (const p of flight.flight_prices) {
        if (p.class_code === classCode) {
          return p;
        }
      }
    }

    return {
      adult_price: 0,
      child_price: 0,
      baby_price: 0,
    };
  }
}