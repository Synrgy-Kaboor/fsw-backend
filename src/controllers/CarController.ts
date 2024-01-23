import type { Car } from '@models/CarModel';
import { CarService } from '@services/CarService';
import type { NextFunction, Request, Response } from 'express';
import NoFileReceivedException from '@exceptions/NoFileReceivedException';

interface IParams {
  id: string;
}

interface IQuery {
  size_type: string;
  page: number;
  limit: number;
  pickup_time: Date;
  min_capacity: number;
}

export class CarController {
  public carService = new CarService();

  public getCars = async (
    req: Request<unknown, unknown, unknown, IQuery>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const limit = req.query.limit || 10;
      const page = Math.max(1, req.query.page) || 1;
      const offset = (page - 1) * limit;
      let minimumCapacity = req.query.min_capacity || 1;
      let maximumCapacity = 999;

      let cars;

      // Size type query
      if (req.query.size_type === 'small') {
        maximumCapacity = 2;
      } else if (req.query.size_type === 'medium') {
        minimumCapacity = Math.max(3, minimumCapacity);
        maximumCapacity = 4;
      } else if (req.query.size_type === 'large') {
        minimumCapacity = Math.max(5, minimumCapacity);
      }

      // Pick up time query
      if (req.query.pickup_time) {
        cars = await this.carService.getCars(
          limit,
          offset,
          minimumCapacity,
          maximumCapacity,
          req.query.pickup_time,
        );
      } else {
        cars = await this.carService.getCars(
          limit,
          offset,
          minimumCapacity,
          maximumCapacity,
        );
      }

      res.status(200).json({
        page: Number(page),
        limit: Number(limit),
        data: cars,
      });
      next();
    } catch (e) {
      next(e);
    }
  };

  public getCarById = async (
    req: Request<IParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const car = await this.carService.getCarById(req.params.id);
      res.status(200).json(car);
      next();
    } catch (e) {
      next(e);
    }
  };

  public createCar = async (
    req: Request<unknown, unknown, Partial<Car>>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const car = await this.carService.createCar(req.body, req.user.id);
      res.status(201).json(car);
      next();
    } catch (e) {
      next(e);
    }
  };

  public addCarImage = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.file) {
        throw new NoFileReceivedException();
      }
      res.status(200).json({
        filename: req.file.filename,
      });
      next();
    } catch (e) {
      next(e);
    }
  };

  public updateCar = async (
    req: Request<IParams, unknown, Partial<Car>>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const car = await this.carService.updateCar(
        req.params.id,
        req.body,
        req.user.id,
      );
      res.status(200).json(car);
      next();
    } catch (e) {
      next(e);
    }
  };

  public deleteCar = async (
    req: Request<IParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const car = await this.carService.deleteCar(req.params.id, req.user.id);
      res.status(200).json(car);
      next();
    } catch (e) {
      next(e);
    }
  };
}
