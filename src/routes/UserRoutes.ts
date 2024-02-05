import { Router } from 'express';
import type { Routes } from './Routes';
import { UserController } from '@controllers/UserController';
import { authenticateToken } from '@middlewares/AuthMiddleware';
import { profileImageUpload } from '@middlewares/FileUploadMiddleware';

export default class UserRoutes implements Routes {
  private readonly path = '/api/v1/user';
  private readonly controller = new UserController();
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, authenticateToken, this.controller.getPersonalInformation);
    this.router.patch(`${this.path}`, authenticateToken, this.controller.updatePersonalInformation);
    this.router.post(`${this.path}/image`, authenticateToken, profileImageUpload.single('image'), this.controller.addProfileImage);
    this.router.patch(`${this.path}/email`, authenticateToken, this.controller.updateEmail);
    this.router.post(`${this.path}/email/otp/verify`, authenticateToken, this.controller.verifyEmail);
    this.router.get(`${this.path}/email/otp/resend`, authenticateToken, this.controller.updateEmailOtp);
    this.router.patch(`${this.path}/phone`, authenticateToken, this.controller.updateNoHp);
    this.router.post(`${this.path}/phone/otp/verify`, authenticateToken, this.controller.verifyNoHp);
    this.router.get(`${this.path}/phone/otp/resend`, authenticateToken, this.controller.updateNoHpOtp);
  }
}