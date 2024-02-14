import { type Airport } from '@models/AirportsModel';
import { type PriceNotification } from '@models/PriceNotificationModel';
import { NotificationService } from '@services/NotificationService';
import { dateToString, stringToDate } from '@utils/dateUtils';
import type { NextFunction, Request, Response } from 'express';

interface IURLParams {
  id: number
}

interface IPriceNotificationResponseBody {
  id?: number;
  totalAdults?: number;
  totalChildren?: number;
  totalBabies?: number;
  classCode?: string;
  minimumPrice?: number;
  maximumPrice?: number;
  date?: string;
  originAirport?: Partial<Airport>;
  destinationAirport?: Partial<Airport>;
}

interface IPriceNotificationRequestBody {
  totalAdults?: number;
  totalChildren?: number;
  totalBabies?: number;
  classCode?: string;
  minimumPrice?: number;
  maximumPrice?: number;
  date?: string;
  originAirportId?: number;
  destinationAirportId?: number;
}

export class NotificationController {
  private readonly notificationService = new NotificationService();

  public getNotificationByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const notification =
        await this.notificationService.getNotificationByEmail(req.user.email);
      res.status(200).json({
        code: 200,
        message: 'Success',
        data: { notification },
      });
    } catch (e) {
      next(e);
    }
  }

  public markReadNotificationById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> =>  {
    try {
      await this.notificationService.markReadNotificationById(
        Number(req.params.id),
      );
      res.status(200).json({
        code: 200,
        message: 'Success',
      });
    } catch (e) {
      next(e);
    }
  }

  public deleteNotificationById = async (
    req: Request, res: Response, next: NextFunction,
  ): Promise<void> => {
    try {
      await this.notificationService.deleteNotificationById(
        Number(req.params.id),
      );
      res.status(200).json({
        code: 200,
        message: 'Success',
      });
    } catch (e) {
      next(e);
    }
  }

  public getPriceNotificationByEmail = async (
    req: Request, res: Response, next: NextFunction
  ): Promise<void> => {
    try {
      const priceNotifications = await this.notificationService.getPriceNotificationByEmail(req.user.email);

      const responseData: IPriceNotificationResponseBody[] = priceNotifications.map(pn => {
        return {
          id: Number(pn.id),
          totalAdults: pn.total_adult,
          totalChildren: pn.total_children,
          totalBabies: pn.total_baby,
          classCode: pn.class_code,
          minimumPrice: pn.minimum_price,
          maximumPrice: pn.maximum_price,
          date: dateToString(pn.date),
          originAirport: pn.origin_airport,
          destinationAirport: pn.destination_airport
        }
      });

      res.status(200).json({
        code: 200,
        message: 'success',
        data: responseData
      })
    } catch (e) {
      next(e);
    }
  }

  public createPriceNotification = async (
    req: Request<unknown, unknown, IPriceNotificationRequestBody>, res: Response, next: NextFunction
  ): Promise<void> => {
    try {
      const pn: Partial<PriceNotification> = {
        total_adult: req.body.totalAdults,
        total_children: req.body.totalChildren,
        total_baby: req.body.totalBabies,
        class_code: req.body.classCode,
        minimum_price: req.body.minimumPrice,
        maximum_price: req.body.maximumPrice,
        date: stringToDate(req.body.date ?? ''),
        origin_airport_id: req.body.originAirportId,
        destination_airport_id: req.body.destinationAirportId
      } 

      await this.notificationService.createPriceNotification(req.user.email, pn);

      res.status(200).json({
        code: 200,
        message: 'success'
      });
    } catch (e) {
      next(e);
    }
  }

  public updatePriceNotification = async (
    req: Request<IURLParams, unknown, IPriceNotificationRequestBody>, res: Response, next: NextFunction
  ): Promise<void> => {
    try {
      const pn: Partial<PriceNotification> = {
        total_adult: req.body.totalAdults,
        total_children: req.body.totalChildren,
        total_baby: req.body.totalBabies,
        class_code: req.body.classCode,
        minimum_price: req.body.minimumPrice,
        maximum_price: req.body.maximumPrice,
        date: stringToDate(req.body.date ?? ''),
        origin_airport_id: req.body.originAirportId,
        destination_airport_id: req.body.destinationAirportId
      } 

      await this.notificationService.updatePriceNotification(req.params.id, pn);

      res.status(200).json({
        code: 200,
        message: 'success'
      });
    } catch (e) {
      next(e);
    }
  }

  public deletePriceNotification = async (
    req: Request<IURLParams>, res: Response, next: NextFunction
  ): Promise<void> => {
    try {
      await this.notificationService.deletePriceNotification(req.params.id);

      res.status(200).json({
        code: 200,
        message: 'success'
      });
    } catch (e) {
      next(e);
    }
  }
}
