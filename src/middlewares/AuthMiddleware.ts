import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import NoTokenException from '@exceptions/NoTokenException';
import InvalidTokenException from '@exceptions/InvalidTokenException';
import { UserRepository } from '@repositories/UserRepository';

const JWT_PRIVATE_KEY = Buffer.from(process.env.JWT_PRIVATE_KEY ?? '', 'base64');

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
      const initialPayload = payload as { sub: string };
      const user = { email: initialPayload.sub }
      req.user = user;
    } catch {
      next(new InvalidTokenException());
    }

    next();
  });
};

export const authenticateAdminToken = (
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

  jwt.verify(token, JWT_PRIVATE_KEY, async (err, payload) => {
    // Check if JWT token is valid
    if (err) {
      next(new InvalidTokenException());
      return;
    }
    try {
      // Check if JWT payload follows standard format
      const initialPayload = payload as { sub: string };
      const user = { email: initialPayload.sub }
      req.user = user;

      // Check if user is admin
      const userRepository = new UserRepository();
      const role = await userRepository.getUserRole(user.email);
      if (role !== 'ADMIN') {
        throw new Error();
      }

    } catch {
      next(new InvalidTokenException());
    }

    next();
  });
};
