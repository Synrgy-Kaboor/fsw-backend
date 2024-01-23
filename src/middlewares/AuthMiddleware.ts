import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import NoTokenException from '@exceptions/NoTokenException';
import InvalidTokenException from '@exceptions/InvalidTokenException';

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY ?? '';

export const authenticateToken = (
  req: Request<any>,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    next(new NoTokenException());
    return;
  }

  jwt.verify(token, JWT_PRIVATE_KEY, (err, payload) => {
    // Check if JWT token is valid
    if (err) {
      next(new InvalidTokenException());
      return;
    }
    try {
      // Check if JWT payload follows standard format
      req.user = payload as { id: string; email: string };
    } catch {
      next(new InvalidTokenException());
    }

    next();
  });
};
