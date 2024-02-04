import { PassportRepository } from '@repositories/PassportRepository';
import type { Passport } from '@models/PassportModel';

export class PassportService {
  private readonly passportRepository = new PassportRepository();

  public async createPassportByEmail(
    email: string,
    passport: Partial<Passport>,
  ): Promise<Passport> {
    return await this.passportRepository.createPassportByEmail(email, passport);
  }

  public async getAllPassportByEmail(email: string): Promise<Passport[]> {
    return await this.passportRepository.getAllPassportByEmail(email);
  }

  public async getPassportById(idPassport: number): Promise<Passport> {
    return await this.passportRepository.getPassportById(idPassport);
  }

  public async updatePassportById(
    idPassport: number,
    passport: Partial<Passport>,
  ): Promise<Passport> {
    return await this.passportRepository.updatePassportById(
      idPassport,
      passport,
    );
  }

  public async deletePassportById(idPassport: number): Promise<Passport> {
    return await this.passportRepository.deletePassportById(idPassport);
  }
}
