import type { Flight } from '@models/FlightModel';
import { AirportRepository } from '@repositories/AirportRepository';
import { FlightRepository } from '@repositories/FlightRepository';
import { timezoneString } from '@utils/dateUtils';

export class FlightService {
  private readonly flightRepository = new FlightRepository();
  private readonly airportRepository = new AirportRepository();

  public async getFlights(originAirportCode: string, destinationAirportCode: string, dateString: string, requiredCapacity: number, classCode: string): Promise<Flight[]> {
    const originAirport = await this.airportRepository.getAirportByCode(originAirportCode);
    const destinationAirport = await this.airportRepository.getAirportByCode(destinationAirportCode);

    const minDate = new Date(`${dateString}T00:00:00.000${timezoneString(originAirport.timezone)}`);
    const maxDate = new Date(`${dateString}T23:59:59.999${timezoneString(originAirport.timezone)}`);

    return await this.flightRepository.getFlights(
      originAirport.id, 
      destinationAirport.id,
      minDate,
      maxDate,
      requiredCapacity,
      classCode
    );
  }

  public async getFlight(id: number): Promise<Flight> {
    return await this.flightRepository.getFlight(id);
  }
}