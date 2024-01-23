import ExpressValidationException from '@exceptions/ExpressValidationException';
import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const handleValidation = (
  req: Request<any>,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ExpressValidationException());
  }

  next();
};
