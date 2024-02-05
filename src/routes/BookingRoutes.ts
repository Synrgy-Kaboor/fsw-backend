import { Router } from 'express';
import type { Routes } from './Routes';
import { authenticateToken } from '@middlewares/AuthMiddleware';
import { BookingController } from '@controllers/BookingController';
import { paymentFileUpload } from '@middlewares/FileUploadMiddleware';

export default class BookingRoutes implements Routes {
  private readonly path = '/api/v1/booking';
  private readonly controller = new BookingController();
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}`, authenticateToken, this.controller.createBooking);
    this.router.get(`${this.path}/:id(\\d+)/payment`, authenticateToken, this.controller.getPaymentDetails);
    this.router.get(`${this.path}/:id(\\d+)/status`, authenticateToken, this.controller.getBookingStatus);
    this.router.post(`${this.path}/payment/file`, authenticateToken, paymentFileUpload.single('file'), this.controller.uploadProofOfPaymentFile);
  }
}