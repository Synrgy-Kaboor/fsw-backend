import { PM_ACCOUNT_NUMBERS } from '@constants/pmAccountNumbers';
import { type Booking } from '@models/BookingModel';
import { type Passenger } from '@models/PassengerModel';
import { BookingService } from '@services/BookingService';
import type { NextFunction, Request, Response } from 'express';

interface IURLParams {
  id: number
}

interface ICreateBookingRequestBody {
  outboundFlightId: number;
  returnFlightId: number;
  classCode: string;
  totalAdult: number;
  totalChild: number;
  totalBaby: number;
  orderer: { fullName: string, title: string, phoneNumber: string, email: string };
  passengers: Array<{ fullName: string, title: string }>;
  addBaggage: boolean;
  addTravelInsurance: boolean;
  addBaggageInsurance: boolean;
  addDelayProtection: boolean;
  paymentMethod: string;
  voucherId: number;
}

interface IPaymentDetailsBody {
  methodName?: string;
  accountNumber?: string;
  totalPrice?: number;
  paymentCompleted?: boolean;
  expiredTime?: string;
}

interface IPaymentStatusBody {
  methodName?: string;
  totalPrice?: number;
  expiredTime?: string;
  paymentCompleted?: boolean;
  paymentDateTime?: string;
  invoiceNumber?: string;
}

export class BookingController {
  private readonly bookingService = new BookingService();

  public createBooking = async (
    req: Request<unknown, unknown, ICreateBookingRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const passengers: Array<Partial<Passenger>> = [];
      for (const p of req.body.passengers) {
        passengers.push({
          full_name: p.fullName,
          title: p.title
        });
      }
      
      const booking: Partial<Booking> = {
        outbound_flight_id: req.body.outboundFlightId,
        return_flight_id: req.body.returnFlightId,
        class_code: req.body.classCode,
        total_adult: req.body.totalAdult,
        total_children: req.body.totalChild,
        total_baby: req.body.totalBaby,
        orderer: {
          full_name: req.body.orderer.fullName,
          title: req.body.orderer.title,
          phone_number: req.body.orderer.phoneNumber,
          email: req.body.orderer.email
        },
        passengers,
        add_baggage: req.body.addBaggage,
        add_travel_insurance: req.body.addTravelInsurance,
        add_baggage_insurance: req.body.addBaggageInsurance,
        add_delay_protection: req.body.addDelayProtection,
        payment: {
          payment_method: req.body.paymentMethod
        },
        voucher_id: req.body.voucherId
      }

      const bookingId = await this.bookingService.createBooking(booking, req.user.email);

      res.status(200).json({
        code: 200,
        message: 'success',
        data: {
          bookingId
        }
      });
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
      const booking = await this.bookingService.getBooking(req.params.id);

      let accountNumber;

      switch (booking.payment.payment_method) {
        case 'BCA':
          accountNumber = PM_ACCOUNT_NUMBERS.BCA;
          break;
        case 'BRI': 
          accountNumber = PM_ACCOUNT_NUMBERS.BRI;
          break;
        case 'BNI':
          accountNumber = PM_ACCOUNT_NUMBERS.BNI;
          break;
        case 'Mandiri':
          accountNumber = PM_ACCOUNT_NUMBERS.Mandiri;
          break;
        default: 
          accountNumber = 'Method Invalid';
      }

      const responseData: IPaymentDetailsBody = {
        methodName: booking.payment.payment_method,
        accountNumber,
        totalPrice: booking.payment.total_price,
        paymentCompleted: booking.payment.payment_completed,
        expiredTime: booking.payment.expired_time?.toISOString()
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
      const booking = await this.bookingService.getBooking(req.params.id);

      const responseData: IPaymentStatusBody = {
        methodName: booking.payment.payment_method,
        totalPrice: booking.payment.total_price,
        expiredTime: booking.payment.expired_time?.toISOString(),
        paymentCompleted: booking.payment.payment_completed,
        paymentDateTime: booking.payment.payment_date_time?.toISOString(),
        invoiceNumber: booking.payment.invoice_number
      };

      res.status(200).json(responseData);
    } catch (e) {
      next(e);
    }
  }
}