import { PassportService } from '@services/PassportService';
import type { NextFunction, Request, Response } from 'express';
import type { Passport } from '@models/PassportModel';

interface CreatePassportBody {
  passportNumber: string;
  fullName: string;
  expiredDate: Date;
  nation: string;
}

export class PassportController {
  private readonly passportService = new PassportService();

  public createPassport = async (
    req: Request<unknown, unknown, CreatePassportBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const passport: Partial<Passport> = {
        passport_number: req.body.passportNumber,
        full_name: req.body.fullName,
        expired_date: new Date(req.body.expiredDate),
        nation: req.body.nation,
        created_at: new Date(),
      };
      const newPassport = await this.passportService.createPassportByEmail(
        req.user.email,
        passport,
      );
      res.status(201).json({
        code: 201,
        message: 'success',
        data: { passport: newPassport },
      });
    } catch (e) {
      next(e);
    }
  };

  public getAllPassportByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const listPassport = await this.passportService.getAllPassportByEmail(
        req.user.email,
      );
      res.status(200).json({
        code: 200,
        message: 'success',
        data: {
          passport: listPassport,
        },
      });
    } catch (e) {
      next(e);
    }
  };

  public getPassportById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (req.params.id === '')
        res.status(400).json({
          code: 400,
          message: 'Passport id is required',
        });

      const id = parseInt(req.params.id);
      const passport = await this.passportService.getPassportById(id);
      res.status(200).json({
        code: 200,
        message: 'success',
        data: {
          passport,
        },
      });
    } catch (e) {
      next(e);
    }
  };

  public updatePassportById = async (
    req: Request<{ id: string }, unknown, CreatePassportBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (req.params.id === '')
        res.status(400).json({
          code: 400,
          message: 'Passport id is required',
        });

      const id = parseInt(req.params.id);
      const passport: Partial<Passport> = {
        passport_number: req.body.passportNumber,
        full_name: req.body.fullName,
        expired_date: new Date(req.body.expiredDate),
        nation: req.body.nation,
        updated_at: new Date(),
      };
      const updatedPassport = await this.passportService.updatePassportById(
        id,
        passport,
      );
      res.status(200).json({
        code: 200,
        message: 'success',
        data: {
          passport: updatedPassport,
        },
      });
    } catch (e) {
      next(e);
    }
  };

  public deletePassportById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (req.params.id === '') {
        res.status(400).json({
          code: 400,
          message: 'Passport id is required',
        });
      }
      const id = parseInt(req.params.id);
      await this.passportService.deletePassportById(id);
      res.status(200).json({
        code: 200,
        message: 'success',
      });
    } catch (e) {
      next(e);
    }
  };
}
