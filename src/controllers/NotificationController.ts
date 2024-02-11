import { NotificationService } from '@services/NotificationService';
import type { NextFunction, Request, Response } from 'express';

interface IURLParams {
  id: number
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
      console.log('a')
    } catch (e) {
      next(e);
    }
  }

  public updatePriceNotification = async (
    req: Request<IURLParams>, res: Response, next: NextFunction
  ): Promise<void> => {
    try {
      console.log('b')
    } catch (e) {
      next(e);
    }
  }

  public deletePriceNotification = async (
    req: Request<IURLParams>, res: Response, next: NextFunction
  ): Promise<void> => {
    try {
      console.log('c')
    } catch (e) {
      next(e);
    }
  }
}
