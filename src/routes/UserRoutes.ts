import { Router } from 'express';
import type { Routes } from './Routes';
import { UserController } from '@controllers/UserController';
import { authenticateToken } from '@middlewares/AuthMiddleware';

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
  }
}