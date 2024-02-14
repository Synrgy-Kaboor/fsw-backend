import { VoucherService } from '@services/VoucherService';
import type { NextFunction, Request, Response } from 'express';

interface IVoucherBody {
  id: number;
  code: string;
  title: string;
  description: string;
  eligiblePaymentMethods: string[];
  maximumDiscount: number;
  expiredTime: string;
}

export class VoucherController {
  private readonly voucherService = new VoucherService();

  public getVouchers = async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<void> => {
    try {
      const vouchers = await this.voucherService.getVouchers();

      const responseData: IVoucherBody[] = [];

      for (const v of vouchers) {
        responseData.push({
          id: Number(v.id),
          code: v.code,
          title: v.title,
          description: v.description,
          eligiblePaymentMethods: v.eligible_payment_methods,
          maximumDiscount: Number(v.maximum_discount),
          expiredTime: v.expired_time.toISOString()
        });
      }

      res.status(200).json(
        {
          code: 200,
          message: 'success',
          data: responseData
        }
      );
      next();
    } catch (e) {
      next(e);
    }
  }
}