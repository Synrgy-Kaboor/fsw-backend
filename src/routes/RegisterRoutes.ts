import { Router } from 'express';
import type { Routes } from './Routes';
import { RegisterController } from '@controllers/RegisterController';
export default class RegisterRoutes implements Routes {
  private readonly path = '/api/v1/auth/register/user';
  private readonly controller = new RegisterController();
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}`, this.controller.register);
    this.router.post(
      `${this.path}/otp/verify`,
      this.controller.verifyOtpRegister,
    );
    this.router.post(
      `${this.path}/otp/resend`,
      this.controller.resendOtpRegister,
    );
  }
}
