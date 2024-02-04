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
  plane?: {
    id?: number,
    code?: string,
    name?: string,
    airline?: {
      id?: number,
      name?: string,
      imageUrl?: string
    }
  },
  adultPrice?: number,
  childPrice?: number,
  babyPrice?: number
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
          id: f.id,
          departureDatetime: f.departure_date_time.toISOString(),
          arrivalDatetime: f.arrival_date_time.toISOString(),
          plane: {
            id: f.plane.id,
            code: f.plane.code,
            name: f.plane.name,
            airline: {
              id: f.plane.airline?.id,
              name: f.plane.airline?.name,
              imageUrl: f.plane.airline?.image_url
            }
          },
          adultPrice: f.flight_prices[0].adult_price,
          childPrice: f.flight_prices[0].child_price,
          babyPrice: f.flight_prices[0].baby_price
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
    req: Request<unknown, unknown>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.status(200).json(
        {
          code: 200,
          message: 'success'
        }
      );
      next();
    } catch (e) {
      next(e);
    }
  }
}