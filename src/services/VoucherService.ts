import { type Voucher } from '@models/VoucherModel';
import { VoucherRepository } from '@repositories/VoucherRepository';

export class VoucherService {
  private readonly voucherRepository = new VoucherRepository();

  public async getVouchers(): Promise<Voucher[]> {
    return await this.voucherRepository.getValidVouchers();
  }
}