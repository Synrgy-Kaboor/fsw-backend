import { Router } from 'express';
import type { Routes } from './Routes';
import { AuthController } from '@controllers/AuthController';
export default class AuthRoutes implements Routes {
  private readonly path = '/api/v1/auth';
  private readonly controller = new AuthController();
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/user/password/forget`, this.controller.checkEmailForgetPassword);    
    this.router.patch(`${this.path}/user/password`, this.controller.updatePassword);
    this.router.post(`${this.path}/user/password/otp/verify`, this.controller.verifyForgetPasswordOtp);
    this.router.post(`${this.path}/user/password/otp/resend`, this.controller.checkEmailForgetPassword);
  }
}
