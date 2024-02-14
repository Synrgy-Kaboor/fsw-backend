import { type Voucher, VoucherModel } from '@models/VoucherModel';

export class VoucherRepository {
  public async getValidVouchers(): Promise<Voucher[]> {
    return await VoucherModel.query()
      .where('expired_time', '>', new Date());
  }

  public async getVoucher(id: number): Promise<Voucher> {
    return await VoucherModel.query().findById(id).throwIfNotFound();
  }
}