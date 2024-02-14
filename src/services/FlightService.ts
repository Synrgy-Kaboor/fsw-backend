import type { Flight } from '@models/FlightModel';
import { AirportRepository } from '@repositories/AirportRepository';
import { FlightRepository } from '@repositories/FlightRepository';
import { NotificationRepository } from '@repositories/NotificationRepository';
import { PriceNotificationRepository } from '@repositories/PriceNotificationRepository';
import { timezoneString } from '@utils/dateUtils';

export class FlightService {
  private readonly flightRepository = new FlightRepository();
  private readonly airportRepository = new AirportRepository();
  private readonly notificationRepository = new NotificationRepository();
  private readonly priceNotificationRepository = new PriceNotificationRepository();

  public async getFlights(
    originAirportCode: string, 
    destinationAirportCode: string, 
    dateString: string, 
    numOfAdults: number,
    numOfChildren: number,
    numOfBabies: number,
    classCode: string, 
    minimumPrice: number | null = null, 
    maximumPrice: number | null = null
  ): Promise<Flight[]> {
    const originAirport = await this.airportRepository.getAirportByCode(originAirportCode);
    const destinationAirport = await this.airportRepository.getAirportByCode(destinationAirportCode);

    const minDate = new Date(`${dateString}T00:00:00.000${timezoneString(originAirport.timezone)}`);
    const maxDate = new Date(`${dateString}T23:59:59.999${timezoneString(originAirport.timezone)}`);

    const flights = await this.flightRepository.getFlights(
      originAirport.id, 
      destinationAirport.id,
      minDate,
      maxDate,
      numOfAdults + numOfChildren,
      classCode
    );

    if (minimumPrice !== null && maximumPrice !== null) {
      return flights.filter(f => {
        const flightPrice = this.calculateFlightPrice(f, numOfAdults, numOfChildren, numOfBabies);
        return flightPrice >= minimumPrice && flightPrice <= maximumPrice;
      });
    } else {
      // Return without price filter
      return flights;
    }
  }

  public async getFlight(id: number, classCode: string): Promise<Flight> {
    return await this.flightRepository.getFlight(id, classCode);
  }

  public async addFlight(flight: Partial<Flight>): Promise<void> {
    if (!flight.origin_airport_id || !flight.destination_airport_id) {
      throw new Error();
    }

    // Add flight data
    await this.flightRepository.addFlight(flight);

    // Find airport data
    const originAirport = await this.airportRepository.getAirport(flight.origin_airport_id);
    const destinationAirport = await this.airportRepository.getAirport(flight.destination_airport_id);

    flight.origin_airport = originAirport;
    flight.destination_airport = destinationAirport;

    // Get relevant price notifications
    const priceNotifications = await this.priceNotificationRepository.getRelevantPriceNotification(flight);

    // Filter by price
    const toBeNotified = priceNotifications.filter(p => {
      const flightPrice = flight.flight_prices?.filter(fp => {
        if (fp.class_code === p.class_code) return true; 
        else return false;
      })[0];

      if (!flightPrice?.adult_price || !flightPrice.child_price || !flightPrice.baby_price) {
        return false;
      }

      const totalPrice = p.total_adult * flightPrice.adult_price + p.total_children * flightPrice.child_price + p.total_baby * flightPrice.baby_price
    
      return totalPrice >= p.minimum_price && totalPrice <= p.maximum_price;
    })

    // Create notification for each relevant price notification
    for (const pn of toBeNotified) {
      await this.notificationRepository.createNotification({
        type: 'price',
        title: `Notifikasi Harga Tiket ${originAirport.code} - ${destinationAirport.code}`,
        detail: `Ada tiket pesawat dari ${originAirport.code} ke ${destinationAirport.code} yang sesuai dengan bujet kamu. Ayo pesan sebelum kehabisan!`,
        user_id: pn.user_id
      })
    }
  }

  private calculateFlightPrice(flight: Flight, numOfAdults: number, numOfChildren: number, numOfBabies: number): number {
    return Number(flight.flight_prices[0].adult_price) * numOfAdults
      + Number(flight.flight_prices[0].child_price) * numOfChildren
      + Number(flight.flight_prices[0].baby_price) * numOfBabies;
  }
}