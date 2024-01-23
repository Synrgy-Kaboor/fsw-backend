import logger from '@utils/logger';
import type { NextFunction, Request, Response } from 'express';

export const reqStartLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.info(req.body, `${req.method} ${req.url} : START`);
  next();
};

export const reqEndLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.on('finish', () => {
    logger.info(`${req.method} ${req.url} : END`);
  });

  next();
};
