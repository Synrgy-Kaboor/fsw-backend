import type { NextFunction, Request, Response } from 'express';
import { RegisterService } from '@services/RegisterService';
import type { User } from '@models/UserModel';

interface RegisterBody {
  phoneNumber: string;
  email: string;
  fullName: string;
  password: string;
}

export class RegisterController {
  private readonly registerService = new RegisterService();

  public register = async (
    req: Request<unknown, unknown, RegisterBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (
        !(
          req.body.fullName &&
          req.body.email &&
          req.body.password &&
          req.body.phoneNumber
        )
      ) {
        res.status(400).json({
          code: 400,
          message: 'Bad Request',
        });
        return;
      }
      const user: Partial<User> = {
        full_name: req.body.fullName,
        email: req.body.email,
        phone_number: req.body.phoneNumber,
        password: req.body.password,
      };
      await this.registerService.register(user);
      res.status(201).json({
        code: 201,
        message: 'success',
      });
    } catch (e) {
      next(e);
    }
  };

  public verifyOtpRegister = async (
    req: Request<unknown, unknown, { otp: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.body.otp) {
        res.status(400).json({
          code: 400,
          message: 'Bad Request',
        });
        return;
      }
      await this.registerService.verifyOtpRegister(req.body.otp);
      res.status(200).json({
        code: 200,
        message: 'success',
      });
    } catch (e) {
      next(e);
    }
  };

  public resendOtpRegister = async (
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
      await this.registerService.resendOtpRegister(req.body.email);
      res.status(200).json({
        code: 200,
        message: 'success',
      });
    } catch (e) {
      next(e);
    }
  };
}
