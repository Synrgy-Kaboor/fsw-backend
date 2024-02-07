import { NotificationService } from '@services/NotificationService';
import type { NextFunction, Request, Response } from 'express';

export class NotificationController {
  private readonly notificationService = new NotificationService();

  public async getNotificationByEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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

  public async markReadNotificationById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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

  public async deleteNotificationById(
    req: Request, res: Response, next: NextFunction,
  ): Promise<void> {
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
}
