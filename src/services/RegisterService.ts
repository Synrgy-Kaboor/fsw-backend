import type { User } from '@models/UserModel';
import { RegisterRepository } from '@repositories/RegisterRepository';
import { generateOtp } from '@utils/generateOtp';
import { SendMailJet } from '@utils/sendMail';
import bcrypt from 'bcrypt';
import {
  getCurrentSeconds,
  getNextFiveMinutesOnSeconds,
} from '@utils/dateUtils';
import { UserRepository } from '@repositories/UserRepository';

export class RegisterService {
  private readonly saltRounds = 10;
  private readonly registerRepository = new RegisterRepository();
  private readonly userRepository = new UserRepository();
  public async register(user: Partial<User>): Promise<User> {
    user.password = user.password
      ? bcrypt.hashSync(user.password, this.saltRounds)
      : undefined;
    user.otp = generateOtp(4);
    user.verify_deadlines = getNextFiveMinutesOnSeconds();
    user.role = 'USER';
    const newUser = await this.registerRepository.register(user);
    await SendMailJet(
      [
        {
          Email: newUser.email,
          Name: newUser.full_name,
        },
      ],
      `Your OTP for verification: ${user.otp}`,
    );
    return newUser;
  }

  public async verifyOtpRegister(otp: string): Promise<User> {
    const findUser = await this.userRepository.getUserByOtp(otp);
    if (findUser.verify_deadlines < getCurrentSeconds()) {
      throw new Error('OTP Expired');
    }
    return await this.registerRepository.verifyOtp(otp);
  }

  public async resendOtpRegister(email: string): Promise<User> {
    const findUser = await this.registerRepository.resendOtp(email);
    await SendMailJet(
      [
        {
          Email: findUser.email,
          Name: findUser.full_name,
        },
      ],
      `Your OTP for verification: ${findUser.otp}`,
    );
    return findUser;
  }
}
