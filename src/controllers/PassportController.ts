import { PassportService } from '@services/PassportService';
import type { NextFunction, Request, Response } from 'express';
import { Passport } from '@models/PassportModel';

export class PassportController {
  private readonly passportService = new PassportService();

  public createPassport = async (
    req: Request,
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
        req.user.email, passport
      );
      res.status(201).json({
        code: 201,
        message: 'success',
        data: newPassport
      })
    } catch (e) {
      next(e);
    }
  };
}
