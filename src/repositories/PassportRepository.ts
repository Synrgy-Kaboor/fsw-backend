import { type Passport, PassportModel } from '@models/PassportModel';
import { UserModel } from '@models/UserModel';

export class PassportRepository {
  public async createPassportByEmail(
    email: string,
    passport: Partial<Passport>,
  ): Promise<Passport> {
    const user = await UserModel.query()
      .where('email', email)
      .first()
      .throwIfNotFound();
    passport.user_id = user.id;
    return await PassportModel.query().insertAndFetch(passport);
  }
  public async getAllPassportByEmail(email: string): Promise<Passport[]> {
    const user = await UserModel.query()
      .where('email', email)
      .select('id')
      .first()
      .throwIfNotFound();
    return await PassportModel.query()
      .select()
      .where({ user_id: user.id, deleted_at: null })
  }

  public async getPassportById(idPassport: number): Promise<Passport> {
    return await PassportModel.query()
      .where({ id: idPassport, deleted_at: null })
      .first()
      .throwIfNotFound();
  }

  public async updatePassportById(
    idPassport: number,
    passport: Partial<Passport>,
  ): Promise<Passport> {
    return await PassportModel.query()
      .patch(passport)
      .where({
        id: idPassport,
      })
      .returning('*')
      .first()
      .throwIfNotFound();
  }
  public async deletePassportById(idPassport: number): Promise<Passport> {
    return await PassportModel.query()
      .patch({deleted_at: new Date()})
      .where({
        id: idPassport,
      })
      .returning('*')
      .first()
      .throwIfNotFound();
  }
}
