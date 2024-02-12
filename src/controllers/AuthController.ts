import type { NextFunction, Request, Response } from 'express';
import { AuthService } from '@services/AuthService';

export class AuthController {
  private readonly authService = new AuthService();

  public checkEmailForgetPassword = async (
    req: Request<unknown, unknown, { email: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.body.email) {
        res.status(400).json({
          code: 400,
          message: 'Bad Request',
        });
        return;
      }
      await this.authService.checkEmailForgetPassword(req.body.email);
      res.status(200).json({
        code: 200,
        message: 'success, check otp in your email',
      });
    } catch (e) {
      next(e);
    }
  };

  public verifyForgetPasswordOtp = async (
    req: Request<unknown, unknown, { email: string; otp: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!(req.body.email && req.body.otp)) {
        res.status(400).json({
          code: 400,
          message: 'Bad Request',
        });
        return;
      }
      await this.authService.verifyForgetPasswordOtp(
        req.body.email,
        req.body.otp,
      );
      res.status(200).json({
        code: 200,
        message: 'success',
      });
    } catch (e) {
      next(e);
    }
  };

  public updatePassword = async (
    req: Request<
      unknown,
      unknown,
      { email: string; password: string; rePassword: string }
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!(req.body.email&&req.body.password && req.body.rePassword)) {
        res.status(400).json({
          code: 400,
          message: 'Bad Request',
        });
        return;
      }
      if (req.body.password !== req.body.rePassword) {
        res.status(400).json({
          code: 400,
          message: 'Password & Retype Password Doesnt Match',
        });
        return;
      }
      await this.authService.updatePassword(req.body.email, req.body.password);
      res.status(200).json({
        code: 200,
        message: 'success',
      });
    } catch (e) {
      next(e);
    }
  };
}
