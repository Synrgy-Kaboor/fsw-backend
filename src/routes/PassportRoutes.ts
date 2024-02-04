import { Router } from 'express';
import type { Routes } from './Routes';
import { authenticateToken } from '@middlewares/AuthMiddleware';
import { PassportController } from '@controllers/PassportController';
export default class PassportRoutes implements Routes {
    private readonly path = '/api/v1/user/passport';
    private readonly controller = new PassportController();
    public router: Router;
  
    constructor() {
      this.router = Router();
  
      this.initializeRoutes();
    }
  
    private initializeRoutes(): void {
        this.router.post(`${this.path}`, authenticateToken, this.controller.createPassport);
        this.router.get(`${this.path}`, authenticateToken, this.controller.getAllPassportByEmail);
        this.router.get(`${this.path}/:id`, authenticateToken, this.controller.getPassportById);
        this.router.patch(`${this.path}/:id`, authenticateToken, this.controller.updatePassportById);
        this.router.delete(`${this.path}/:id`, authenticateToken, this.controller.deletePassportById);
    }
  }