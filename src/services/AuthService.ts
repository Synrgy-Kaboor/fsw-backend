import { type User } from '@models/UserModel';
import { generateOtp } from '@utils/generateOtp';
import { SendMailJet } from '@utils/sendMail';
import bcrypt from 'bcrypt';
import {
  getCurrentSeconds,
  getNextFiveMinutesOnSeconds,
} from '@utils/dateUtils';
import { UserRepository } from '@repositories/UserRepository';

export class AuthService {
  private readonly saltRounds = 10;
  private readonly userRepository = new UserRepository();

  public async checkEmailForgetPassword(email: string): Promise<User> {
    const patchOtpPassword =
      await this.userRepository.updatePersonalInformationByEmail(email, {
        request_for_change_password_otp: generateOtp(4),
        forget_password_verify_deadlines: getNextFiveMinutesOnSeconds(),
      });
    await SendMailJet(
      [
        {
          Email: patchOtpPassword.email,
          Name: patchOtpPassword.full_name,
        },
      ],
      `Your OTP for Forget Password: ${patchOtpPassword.request_for_change_password_otp}`,
    );
    return patchOtpPassword;
  }

  public async verifyForgetPasswordOtp(
    email: string,
    otp: string,
  ): Promise<User> {
    const findUser = await this.userRepository.getUserByEmail(email);
    if (findUser.request_for_change_password_otp !== otp) {
      throw new Error('Invalid OTP');
    } else {
      if (findUser.forget_password_verify_deadlines < getCurrentSeconds()) {
        throw new Error('OTP Expired');
      }
      await this.userRepository.updatePersonalInformationByEmail(email, {
        request_for_change_password_verified: true,
      });
      return findUser;
    }
  }

  public async updatePassword(email: string, password: string): Promise<User> {
    const findUser = await this.userRepository.getUserByEmail(email);
    if (!findUser.request_for_change_password_verified) {
      throw new Error('OTP Not Verified');
    } else {
      const hashPassword = bcrypt.hashSync(password, this.saltRounds);
      const patchOtpPassword =
        await this.userRepository.updatePersonalInformationByEmail(email, {
          password: hashPassword,
          request_for_change_password_otp: '',
          request_for_change_password_verified: false,
          forget_password_verify_deadlines: 0,
        });
      return patchOtpPassword;
    }
  }
}
