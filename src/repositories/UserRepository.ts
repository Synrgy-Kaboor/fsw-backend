import { type User, UserModel } from '@models/UserModel';

export class UserRepository {
  public async getPersonalInformationByEmail(email: string): Promise<User> {
    return await UserModel.query()
      .select(
        'title',
        'full_name',
        'gender',
        'nik',
        'birth_day',
        'nation',
        'city',
        'address',
        'is_wni',
        'image_name'
      )
      .findOne({
        email,
      })
      .throwIfNotFound();
  }

  public async updatePersonalInformationByEmail(
    email: string,
    user: Partial<User>,
  ): Promise<User> {
    return await UserModel.query()
      .patch(user)
      .where({
        email,
      })
      .returning('*')
      .first()
      .throwIfNotFound();
  }

  public async getUserIdByEmail(email: string): Promise<number> {
    return (
      await UserModel.query()
        .select('id')
        .findOne({
          email,
        })
        .throwIfNotFound()
    ).id;
  }

  public async updateUserEmailByEmail(
    email: string,
    newEmail: string,
  ): Promise<User> {
    return await UserModel.query()
      .patch({
        incoming_email_change: newEmail,
        email_otp: `${Math.floor(Math.random() * 10000)}`,
      })
      .where({ email })
      .returning('*')
      .first()
      .throwIfNotFound();
  }

  public async verifyEmail(email: string, otp: string): Promise<User> {
    const user = await UserModel.query()
      .findOne({ email, email_otp: otp })
      .throwIfNotFound();
    return await UserModel.query()
      .patch({
        email: user.incoming_email_change,
        incoming_email_change: '',
        email_otp: '',
      })
      .where({ email, email_otp: otp })
      .returning('*')
      .first()
      .throwIfNotFound();
  }

  public async updateEmailOtpByEmail(email:string): Promise<User> {
    return await UserModel.query()
      .patch({
        email_otp: `${Math.floor(Math.random() * 10000)}`,
      })
      .where({ email })
      .returning('*')
      .first()
      .throwIfNotFound();
  }

  public async updateUserNoHpByEmail(
    email: string,
    noHp: string,
  ): Promise<User> {
    return await UserModel.query()
      .patch({
        incoming_nohp_change: noHp,
        nohp_otp: `${Math.floor(Math.random() * 10000)}`,
      })
      .where({ email })
      .returning('*')
      .first()
      .throwIfNotFound();
  }

  public async verifyNoHp(email: string, otp: string): Promise<User> {
    const user = await UserModel.query()
      .findOne({ email, nohp_otp: otp })
      .throwIfNotFound();
    return await UserModel.query()
      .patch({
        phone_number: user.incoming_nohp_change,
        incoming_nohp_change: '',
        nohp_otp: '',
      })
      .where({ email, nohp_otp: otp })
      .returning('*')
      .first()
      .throwIfNotFound();
  }

  public async updateNoHpOtpByEmail(email:string): Promise<User> {
    return await UserModel.query()
      .patch({
        nohp_otp: `${Math.floor(Math.random() * 10000)}`,
      })
      .where({ email })
      .returning('*')
      .first()
      .throwIfNotFound();
  }
  
}
