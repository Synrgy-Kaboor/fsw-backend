import logger from '@utils/logger';
import type { NextFunction, Request, Response } from 'express';
import {
  DBError,
  ForeignKeyViolationError,
  NotFoundError,
  UniqueViolationError,
} from 'objection';
import { DatabaseError } from 'pg';
import NoFileReceivedException from '@exceptions/NoFileReceivedException';
import NoTokenException from '@exceptions/NoTokenException';
import InvalidTokenException from '@exceptions/InvalidTokenException';
import ExpressValidationException from '@exceptions/ExpressValidationException';

export const exceptionHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err) {
    if (
      err instanceof ExpressValidationException ||
      err instanceof NoFileReceivedException
    ) {
      /**
       * @openapi
       * components:
       *      schemas:
       *          BadRequestError:
       *              type: object
       *              properties:
       *                  success:
       *                      type: boolean
       *                      example: false
       *                  message:
       *                      type: string
       *                      example: 'Bad Request'
       */
      logger.info(err, `${req.method} ${req.url} : Bad Request`);
      res.status(400).json({
        success: false,
        message: 'Bad Request',
      });
    } else if (
      err instanceof NoTokenException
    ) {
      /**
       * @openapi
       * components:
       *      schemas:
       *          WrongAuthCredentialsError:
       *              type: object
       *              properties:
       *                  success:
       *                      type: boolean
       *                      example: false
       *                  message:
       *                      type: string
       *                      example: 'Wrong Authentication Credentials'
       *          NoTokenError:
       *              type: object
       *              properties:
       *                  success:
       *                      type: boolean
       *                      example: false
       *                  message:
       *                      type: string
       *                      example: 'No JWT Token Provided'
       */
      logger.info(err, `${req.method} ${req.url} : Unauthorized`);
      res.status(401).json({
        success: false,
        message: err.message,
      });
    } else if (err instanceof InvalidTokenException) {
      /**
       * @openapi
       * components:
       *      schemas:
       *          InvalidTokenError:
       *              type: object
       *              properties:
       *                  success:
       *                      type: boolean
       *                      example: false
       *                  message:
       *                      type: string
       *                      example: 'Invalid JWT Token'
       */
      logger.info(err, `${req.method} ${req.url} : Forbidden`);
      res.status(403).json({
        success: false,
        message: err.message,
      });
    } else if (err instanceof NotFoundError) {
      /**
       * @openapi
       * components:
       *      schemas:
       *          NotFoundError:
       *              type: object
       *              properties:
       *                  success:
       *                      type: boolean
       *                      example: false
       *                  message:
       *                      type: string
       *                      example: 'Not Found'
       */
      logger.warn(err, `${req.method} ${req.url} : Not Found`);
      res.status(404).json({
        success: false,
        message: 'Not Found',
      });
    } else if (
      err instanceof UniqueViolationError ||
      err instanceof ForeignKeyViolationError
    ) {
      /**
       * @openapi
       * components:
       *      schemas:
       *          ConstraintViolationError:
       *              type: object
       *              properties:
       *                  success:
       *                      type: boolean
       *                      example: false
       *                  message:
       *                      type: string
       *                      example: 'Constraint Violation Error'
       */
      logger.warn(err, `${req.method} ${req.url} : Constraint Violation Error`);
      res.status(409).json({
        success: false,
        message: 'Constraint Violation Error',
      });
    } else if (err instanceof DBError || err instanceof DatabaseError) {
      logger.error(err, `${req.method} ${req.url} : Database Error`);
      res.status(500).json({
        success: false,
        message: 'Database Error',
      });
    } else {
      logger.error(err, `${req.method} ${req.url} : System Error`);
      console.log(err)
      res.status(500).json({
        success: false,
        message: 'System Error',
      });
    }
  }

  next();
};
