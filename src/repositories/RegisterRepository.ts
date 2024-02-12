import { type User, UserModel } from '@models/UserModel';
import { getNextFiveMinutesOnSeconds } from '@utils/dateUtils';
import { generateOtp } from '@utils/generateOtp';

export class RegisterRepository {
  public async register(user: Partial<User>): Promise<User> {
    const findUser = await UserModel.query()
      .where({ email: user.email })
      .first();
    if (findUser) {
      throw new Error('User already exists');
    }
    return await UserModel.query().insert(user);
  }

  public async verifyOtp(otp: string): Promise<User> {
    return await UserModel.query()
      .patch({
        otp: undefined,
        verified: true,
      })
      .where({ otp })
      .returning('*')
      .first()
      .throwIfNotFound();
  }

  public async resendOtp(email: string): Promise<User> {
    return await UserModel.query()
      .patch({
        otp: generateOtp(4),
        verify_deadlines: getNextFiveMinutesOnSeconds(),
      })
      .where({ email })
      .returning('*')
      .first()
      .throwIfNotFound();
  }
}
