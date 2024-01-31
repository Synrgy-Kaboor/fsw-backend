import { BookingService } from '@services/BookingService';
import type { NextFunction, Request, Response } from 'express';

interface IURLParams {
  id: number
}

interface ICreateBookingRequestBody {
  flightId: number;
  classCode: string;
  totalAdult: number;
  totalChild: number;
  totalBaby: number;
  orderer: { fullName: string, title: string, phoneNumber: string, email: string };
  passengers: Array<{ fullName: string, title: string }>;
  addBaggage: boolean;
  addTravelInsurance: boolean;
  addDelayProtection: boolean;
  paymentMethod: string;
  voucherId: number;
}

interface IPaymentDetailsBody {
  methodName: string;
  accountNumber: string;
  totalPrice: number;
  paymentCompleted: boolean;
  expiredTime: string;
}

interface IPaymentStatusBody {
  methodName: string;
  totalPrice: number;
  expiredTime: string;
  paymentCompleted: boolean;
  paymentDateTime: string;
  invoiceNumber: string;
}

export class BookingController {
  private readonly bookingService = new BookingService();

  public createBooking = async (
    req: Request<unknown, unknown, ICreateBookingRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {


      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }

  public getPaymentDetails = async (
    req: Request<IURLParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const responseData: IPaymentDetailsBody = {
        methodName: '',
        accountNumber: '',
        totalPrice: 0,
        paymentCompleted: false,
        expiredTime: ''
      };

      res.status(200).json(responseData);
    } catch (e) {
      next(e);
    }
  }

  public getBookingStatus = async (
    req: Request<IURLParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const responseData: IPaymentStatusBody = {
        methodName: '',
        totalPrice: 0,
        expiredTime: '',
        paymentCompleted: false,
        paymentDateTime: '',
        invoiceNumber: ''
      };

      res.status(200).json(responseData);
    } catch (e) {
      next(e);
    }
  }
}