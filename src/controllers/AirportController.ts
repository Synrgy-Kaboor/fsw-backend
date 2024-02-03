import { type Airport } from '@models/AirportsModel';
import { AirportService } from '@services/AirportService';
import type { NextFunction, Request, Response } from 'express';

export class AirportController {
  private readonly airportService = new AirportService();

  public getAirports = async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<void> => {
    try {
      const airports = await this.airportService.getAirports();

      res.status(200).json(
        {
          code: 200,
          message: 'success',
          data: airports
        }
      );
      next();
    } catch (e) {
      next(e);
    }
  }

  public createAirport = async (
    req: Request<unknown, unknown, Partial<Airport>>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.airportService.createAirport(req.body)

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