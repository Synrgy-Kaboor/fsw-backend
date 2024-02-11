import type { Flight } from '@models/FlightModel';
import { AirportRepository } from '@repositories/AirportRepository';
import { FlightRepository } from '@repositories/FlightRepository';
import { timezoneString } from '@utils/dateUtils';

export class FlightService {
  private readonly flightRepository = new FlightRepository();
  private readonly airportRepository = new AirportRepository();

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

  private calculateFlightPrice(flight: Flight, numOfAdults: number, numOfChildren: number, numOfBabies: number): number {
    return Number(flight.flight_prices[0].adult_price) * numOfAdults
      + Number(flight.flight_prices[0].child_price) * numOfChildren
      + Number(flight.flight_prices[0].baby_price) * numOfBabies;
  }
}