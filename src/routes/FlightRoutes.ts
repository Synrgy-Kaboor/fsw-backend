import { Router } from 'express';
import type { Routes } from './Routes';
import { FlightController } from '@controllers/FlightController';

export default class FlightRoutes implements Routes {
  private readonly path = '/api/v1/flight';
  private readonly controller = new FlightController();
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.controller.getFlights);
    this.router.patch(`${this.path}/:id`, this.controller.getFlight);
  }
}