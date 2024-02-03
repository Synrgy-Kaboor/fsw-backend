import { Router } from 'express';
import type { Routes } from './Routes';
import { authenticateToken } from '@middlewares/AuthMiddleware';
import { AirportController } from '@controllers/AirportController';

export default class AirportRoutes implements Routes {
  private readonly path = '/api/v1/airport';
  private readonly controller = new AirportController();
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.controller.getAirports);
    this.router.post(`${this.path}`, authenticateToken, this.controller.createAirport);
  }
}