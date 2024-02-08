import { PM_ACCOUNT_NUMBERS } from '@constants/pmAccountNumbers';
import InvalidRequestException from '@exceptions/InvalidRequestException';
import NoFileReceivedException from '@exceptions/NoFileReceivedException';
import { type Booking } from '@models/BookingModel';
import { type Passenger } from '@models/PassengerModel';
import { BookingService } from '@services/BookingService';
import type { NextFunction, Request, Response } from 'express';
import { join } from 'path';

interface IURLParams {
  id: number
}

interface IUserBookingListItem {
  id?: number;
  bookingCode?: string;
  type?: string;
  flight: { 
    departureDateTime?: string,
    arrivalDateTime?: string,
    plane: {
      id?: number,
      code?: string,
      name?: string,
      airline?: {
        id?: number,
        name?: string,
        imageUrl?: string
      }
    },
    originAirport: {
      id?: number,
      code?: string,
      name?: string,
      timezone?: number
    },
    destinationAirport: {
      id?: number,
      code?: string,
      name?: string,
      timezone?: number
    }
  },
  uploadedProofOfPayment?: boolean,
  paymentCompleted?: boolean
}

interface IBookingByIdBody extends IUserBookingListItem {
  passengers: Array<{ fullName?: string, title?: string }>;
  addBaggage: boolean;
  addTravelInsurance: boolean;
  addBaggageInsurance: boolean;
  addDelayProtection: boolean;
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

interface IProofOfPaymentBody {
  fileName: string;
}

export class BookingController {
  private readonly bookingService = new BookingService();

  public getActiveBookingsOfUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const bookings = await this.bookingService.getBookings(req.user.email);
      const responseData: IUserBookingListItem[] = [];

      for (const b of bookings) {
        // Check if proof of payment has not been uploaded and the payment has expired
        if (!b.payment.payment_completed 
          && (!b.proof_of_payment_file_name 
            && (!b.payment.expired_time 
            || b.payment.expired_time < new Date()
            )
          )
        ) {
          continue;
        }

        // Check if outbound flight is past current date
        if (!b.outbound_flight.departure_date_time || b.outbound_flight.departure_date_time < new Date()) {
          continue;
        }

        // Push outbound flight to list
        responseData.push({ ...this.createOutboundFlightListItem(b), type: 'outbound' })

        // Check if return flight is past current date and exists
        if (!b.return_flight.departure_date_time || b.return_flight.departure_date_time < new Date()) {
          continue;
        }

        // Push return flight to list
        responseData.push({ ...this.createReturnFlightListItem(b), type: 'return' });
      }

      res.status(200).json({
        code: 200,
        message: 'success',
        data: responseData
      });
      next();
    } catch (e) {
      next(e);
    }
  } 

  public getFinishedBookingsOfUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const bookings = await this.bookingService.getBookings(req.user.email);
      console.log(bookings);
      const responseData: IUserBookingListItem[] = [];

      for (const b of bookings) {
        // Check if proof of payment has not been uploaded and the payment has expired
        if (!b.payment.payment_completed 
          && (!b.proof_of_payment_file_name 
            && (!b.payment.expired_time 
            || b.payment.expired_time < new Date()
            )
          )
        ) {
          continue;
        }

        // Check if outbound flight is past current date
        if (!b.outbound_flight.departure_date_time || b.outbound_flight.departure_date_time >= new Date()) {
          continue;
        }

        // Push outbound flight to list
        responseData.push(this.createOutboundFlightListItem(b))

        // Check if return flight is past current date and exists
        if (!b.return_flight.departure_date_time || b.return_flight.departure_date_time >= new Date()) {
          continue;
        }

        // Push return flight to list
        responseData.push(this.createReturnFlightListItem(b));
      }

      res.status(200).json({
        code: 200,
        message: 'success',
        data: responseData
      });
      next();
    } catch (e) {
      next(e);
    }
  } 

  public getBookingOutboundData = async (
    req: Request<IURLParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const booking = await this.bookingService.getBooking(Number(req.params.id));
      const responseData = this.createOutboundBookingByIdBody(booking);

      res.status(200).json({
        code: 200,
        message: 'success',
        data: responseData
      });
      next();
    } catch (e) {
      next(e);
    }
  } 

  public getBookingReturnData = async (
    req: Request<IURLParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const booking = await this.bookingService.getBooking(Number(req.params.id));
      
      if (!booking.return_flight_id) {
        res.status(404).json({
          code: 404,
          message: 'Not Found'
        });
      } else {
        const responseData = this.createReturnBookingByIdBody(booking);
        res.status(200).json({
          code: 200,
          message: 'success',
          data: responseData
        });
      }

      next();
    } catch (e) {
      next(e);
    }
  } 

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

      res.status(200).json({
        code: 200,
        message: 'success',
        data: responseData
      });
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

      res.status(200).json({
        code: 200,
        message: 'success',
        data: responseData
      });
    } catch (e) {
      next(e);
    }
  }

  public uploadProofOfPaymentFile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.file) {
        throw new NoFileReceivedException();
      }

      res.status(200).json({
        code: 200,
        message: 'success',
        data: {
          fileName: req.file.filename,
          fileUrl: `${process.env.BACKEND_URL}/payment/file/${req.file.filename}`
        }
      });
      next();
    } catch (e) {
      next(e);
    }
  }

  public submitProofOfPayment = async (
    req: Request<IURLParams, unknown, IProofOfPaymentBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.bookingService.addProofOfPaymentFilename(Number(req.params.id), req.body.fileName);

      res.status(200).json({
        code: 200,
        message: 'success'
      });
      next();
    } catch (e) {
      next(e);
    }
  }

  public approvePayment = async (
    req: Request<IURLParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.bookingService.approvePayment(Number(req.params.id));
      
      res.status(200).json({
        code: 200,
        message: 'success'
      });
    } catch (e) {
      next(e);
    }

  }

  public downloadOutboundTicket = async (
    req: Request<IURLParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const booking = await this.bookingService.getBooking(req.params.id);

      if (!booking.outbound_ticket_file_name) {
        throw new InvalidRequestException();
      }

      res.download(
        join(__dirname, '..', '..', 'storage', 'ticket', booking.outbound_ticket_file_name),
        `${booking.id}-outbound-flight.pdf`
      );
    } catch (e) {
      next(e);
    }
  } 

  public downloadReturnTicket = async (
    req: Request<IURLParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const booking = await this.bookingService.getBooking(req.params.id);

      if (!booking.return_ticket_file_name) {
        throw new InvalidRequestException();
      }

      res.download(
        join(__dirname, '..', '..', 'storage', 'ticket', booking.return_ticket_file_name),
        `${booking.id}-return-flight.pdf`
      );
    } catch (e) {
      next(e);
    }
  } 

  private createOutboundFlightListItem(b: Booking): IUserBookingListItem {
    return {
      id: b.id,
      bookingCode: b.booking_code,
      flight: {
        departureDateTime: b.outbound_flight.departure_date_time?.toISOString(),
        arrivalDateTime: b.outbound_flight.arrival_date_time?.toISOString(),
        plane: {
          id: b.outbound_flight.plane?.id,
          code: b.outbound_flight.plane?.code,
          name: b.outbound_flight.plane?.name,
          airline: {
            id: b.outbound_flight.plane?.airline?.id,
            name: b.outbound_flight.plane?.airline?.name,
            imageUrl: b.outbound_flight.plane?.airline?.image_url
          }
        },
        originAirport: {
          id: b.outbound_flight.origin_airport?.id,
          code: b.outbound_flight.origin_airport?.code,
          name: b.outbound_flight.origin_airport?.name,
          timezone: b.outbound_flight.origin_airport?.timezone
        },
        destinationAirport: {
          id: b.outbound_flight.destination_airport?.id,
          code: b.outbound_flight.destination_airport?.code,
          name: b.outbound_flight.destination_airport?.name,
          timezone: b.outbound_flight.destination_airport?.timezone
        }
      },
      uploadedProofOfPayment: !!b.proof_of_payment_file_name,
      paymentCompleted: b.payment.payment_completed
    };
  }

  private createReturnFlightListItem(b: Booking): IUserBookingListItem {
    return {
      id: b.id,
      bookingCode: b.booking_code,
      flight: {
        departureDateTime: b.return_flight.departure_date_time?.toISOString(),
        arrivalDateTime: b.return_flight.arrival_date_time?.toISOString(),
        plane: {
          id: b.return_flight.plane?.id,
          code: b.return_flight.plane?.code,
          name: b.return_flight.plane?.name,
          airline: {
            id: b.return_flight.plane?.airline?.id,
            name: b.return_flight.plane?.airline?.name,
            imageUrl: b.return_flight.plane?.airline?.image_url
          }
        },
        originAirport: {
          id: b.return_flight.origin_airport?.id,
          code: b.return_flight.origin_airport?.code,
          name: b.return_flight.origin_airport?.name,
          timezone: b.return_flight.origin_airport?.timezone
        },
        destinationAirport: {
          id: b.return_flight.destination_airport?.id,
          code: b.return_flight.destination_airport?.code,
          name: b.return_flight.destination_airport?.name,
          timezone: b.return_flight.destination_airport?.timezone
        }
      },
      uploadedProofOfPayment: !!b.proof_of_payment_file_name,
      paymentCompleted: b.payment.payment_completed
    };
  }

  private createOutboundBookingByIdBody(b: Booking): IBookingByIdBody {
    return {
      id: b.id,
      bookingCode: b.booking_code,
      flight: {
        departureDateTime: b.outbound_flight.departure_date_time?.toISOString(),
        arrivalDateTime: b.outbound_flight.arrival_date_time?.toISOString(),
        plane: {
          id: b.outbound_flight.plane?.id,
          code: b.outbound_flight.plane?.code,
          name: b.outbound_flight.plane?.name,
          airline: {
            id: b.outbound_flight.plane?.airline?.id,
            name: b.outbound_flight.plane?.airline?.name,
            imageUrl: b.outbound_flight.plane?.airline?.image_url
          }
        },
        originAirport: {
          id: b.outbound_flight.origin_airport?.id,
          code: b.outbound_flight.origin_airport?.code,
          name: b.outbound_flight.origin_airport?.name,
          timezone: b.outbound_flight.origin_airport?.timezone
        },
        destinationAirport: {
          id: b.outbound_flight.destination_airport?.id,
          code: b.outbound_flight.destination_airport?.code,
          name: b.outbound_flight.destination_airport?.name,
          timezone: b.outbound_flight.destination_airport?.timezone
        }
      },
      uploadedProofOfPayment: !!b.proof_of_payment_file_name,
      paymentCompleted: b.payment.payment_completed,
      passengers: b.passengers.map((p) => { return {fullName: p.full_name, title: p.title} }),
      addBaggage: b.add_baggage,
      addTravelInsurance: b.add_travel_insurance,
      addBaggageInsurance: b.add_baggage_insurance,
      addDelayProtection: b.add_delay_protection
    };
  }

  private createReturnBookingByIdBody(b: Booking): IBookingByIdBody {
    return {
      id: b.id,
      bookingCode: b.booking_code,
      flight: {
        departureDateTime: b.return_flight.departure_date_time?.toISOString(),
        arrivalDateTime: b.return_flight.arrival_date_time?.toISOString(),
        plane: {
          id: b.return_flight.plane?.id,
          code: b.return_flight.plane?.code,
          name: b.return_flight.plane?.name,
          airline: {
            id: b.return_flight.plane?.airline?.id,
            name: b.return_flight.plane?.airline?.name,
            imageUrl: b.return_flight.plane?.airline?.image_url
          }
        },
        originAirport: {
          id: b.return_flight.origin_airport?.id,
          code: b.return_flight.origin_airport?.code,
          name: b.return_flight.origin_airport?.name,
          timezone: b.return_flight.origin_airport?.timezone
        },
        destinationAirport: {
          id: b.return_flight.destination_airport?.id,
          code: b.return_flight.destination_airport?.code,
          name: b.return_flight.destination_airport?.name,
          timezone: b.return_flight.destination_airport?.timezone
        }
      },
      uploadedProofOfPayment: !!b.proof_of_payment_file_name,
      paymentCompleted: b.payment.payment_completed,
      passengers: b.passengers.map((p) => { return {fullName: p.full_name, title: p.title} }),
      addBaggage: b.add_baggage,
      addTravelInsurance: b.add_travel_insurance,
      addBaggageInsurance: b.add_baggage_insurance,
      addDelayProtection: b.add_delay_protection
    };
  }
}