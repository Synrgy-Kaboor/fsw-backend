import { Router } from 'express';
import type { Routes } from './Routes';
import { authenticateToken } from '@middlewares/AuthMiddleware';
import { NotificationController } from '@controllers/NotificationController';
export default class NotificationRoutes implements Routes {
    private readonly path = '/api/v1/user/notification';
    private readonly controller = new NotificationController();
    public router: Router;
  
    constructor() {
      this.router = Router();
  
      this.initializeRoutes();
    }
  
    private initializeRoutes(): void {
        this.router.get(`${this.path}`, authenticateToken, this.controller.getNotificationByEmail);
        this.router.patch(`${this.path}/:id`, authenticateToken, this.controller.markReadNotificationById);
        this.router.delete(`${this.path}/:id`, authenticateToken, this.controller.deleteNotificationById);
    }
  }