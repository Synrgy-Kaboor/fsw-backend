import { FlightService } from '@services/FlightService';
import type { NextFunction, Request, Response } from 'express';

interface IFlightSearchQuery {
  originAirportCode: string;
  destinationAirportCode: string;
  date: string;
  numOfAdults: number;
  numOfChildren: number;
  numOfBabies: number;
  classCode: string;
}

interface IFlightBody {
  id?: number;
  departureDatetime?: string;
  arrivalDatetime?: string;
  plane: {
    id?: number,
    code?: string,
    name?: string,
    airline?: {
      id?: number,
      name?: string,
      imageUrl?: string
    }
  },
  originAirport: {
    id?: number,
    code?: string,
    name?: string,
    timezone?: number
  },
  destinationAirport: {
    id?: number,
    code?: string,
    name?: string,
    timezone?: number
  }
  adultPrice?: number,
  childPrice?: number,
  babyPrice?: number
}

interface IURLParams {
  id: number
}

interface IFlightByIdQuery {
  classCode: string
}

export class FlightController {
  private readonly flightService = new FlightService();

  public getFlights = async (
    req: Request<unknown, unknown, unknown, IFlightSearchQuery>, 
    res: Response, 
    next: NextFunction
  ): Promise<void> => {
    if (!req.query.originAirportCode
      || !req.query.destinationAirportCode
      || !req.query.date
      || !req.query.numOfAdults
      || !req.query.numOfChildren
      || !req.query.classCode) 
    {
      res.status(200).json(
        {
          code: 200,
          message: 'success, but query not complete, unable to do search',
          data: []
        }
      );
      next();
      return;
    }

    try {
      const flights = await this.flightService.getFlights(
        req.query.originAirportCode,
        req.query.destinationAirportCode,
        req.query.date,
        Number(req.query.numOfAdults) + Number(req.query.numOfChildren),
        req.query.classCode
      )

      const responseData: IFlightBody[] = [];

      for (const f of flights) {
        responseData.push({
          id: Number(f.id),
          departureDatetime: f.departure_date_time.toISOString(),
          arrivalDatetime: f.arrival_date_time.toISOString(),
          plane: {
            id: Number(f.plane.id),
            code: f.plane.code,
            name: f.plane.name,
            airline: {
              id: Number(f.plane.airline?.id),
              name: f.plane.airline?.name,
              imageUrl: f.plane.airline?.image_url
            }
          },
          originAirport: {
            id: Number(f.origin_airport.id),
            code: f.origin_airport.code,
            name: f.origin_airport.name,
            timezone: Number(f.origin_airport.timezone)
          },
          destinationAirport: {
            id: Number(f.destination_airport.id),
            code: f.destination_airport.code,
            name: f.destination_airport.name,
            timezone: Number(f.destination_airport.timezone)
          },
          adultPrice: Number(f.flight_prices[0].adult_price),
          childPrice: Number(f.flight_prices[0].child_price),
          babyPrice: Number(f.flight_prices[0].baby_price)
        })
      }

      res.status(200).json(
        {
          code: 200,
          message: 'success',
          data: responseData
        }
      );
      next();
    } catch (e) {
      next(e);
    }
  }

  public getFlight = async (
    req: Request<IURLParams, unknown, unknown, IFlightByIdQuery>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!req.query.classCode) 
    {
      res.status(400).json({
        code: 400,
        message: 'Bad Request'
      });
      next();
      return;
    }

    try {
      const flight = await this.flightService.getFlight(
        req.params.id,
        req.query.classCode
      )

      const responseData: IFlightBody = {
        id: Number(flight.id),
        departureDatetime: flight.departure_date_time.toISOString(),
        arrivalDatetime: flight.arrival_date_time.toISOString(),
        plane: {
          id: Number(flight.plane.id),
          code: flight.plane.code,
          name: flight.plane.name,
          airline: {
            id: Number(flight.plane.airline?.id),
            name: flight.plane.airline?.name,
            imageUrl: flight.plane.airline?.image_url
          }
        },
        originAirport: {
          id: Number(flight.origin_airport.id),
          code: flight.origin_airport.code,
          name: flight.origin_airport.name,
          timezone: Number(flight.origin_airport.timezone)
        },
        destinationAirport: {
          id: Number(flight.destination_airport.id),
          code: flight.destination_airport.code,
          name: flight.destination_airport.name,
          timezone: Number(flight.destination_airport.timezone)
        },
        adultPrice: Number(flight.flight_prices[0].adult_price),
        childPrice: Number(flight.flight_prices[0].child_price),
        babyPrice: Number(flight.flight_prices[0].baby_price)
      }

      res.status(200).json(
        {
          code: 200,
          message: 'success',
          data: responseData
        }
      );
      next();
    } catch (e) {
      next(e);
    }
  }
}