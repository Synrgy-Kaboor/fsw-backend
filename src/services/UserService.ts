import type { User } from '@models/UserModel';
import { UserRepository } from '@repositories/UserRepository';
import { SendMailJet, receipentEmail } from '@utils/sendMail';

export class UserService {
  private readonly userRepository = new UserRepository();

  public async getPersonalInformation(email: string): Promise<User> {
    return await this.userRepository.getPersonalInformationByEmail(email);
  }

  public async updatePersonalInformation(
    email: string,
    user: Partial<User>,
  ): Promise<User> {
    return await this.userRepository.updatePersonalInformationByEmail(
      email,
      user,
    );
  }
  public async updateUserEmail(email: string, newEmail: string): Promise<User> {
    const user = await this.userRepository.updateUserEmailByEmail(
      email,
      newEmail,
    );
    const receipentEmail: receipentEmail = {
      Email: user.incoming_email_change,
      Name: user.full_name,
    };
    await SendMailJet(
      'ikhromax@gmail.com',
      [receipentEmail],
      `Your OTP: ${user.email_otp}`,
    );
    return user;
  }
  public async verifyEmail(email: string, otp: string): Promise<User> {
    return await this.userRepository.verifyEmail(email, otp);
  }
  public async updateUserNoHp(email: string, noHp: string): Promise<User> {
    const user = await this.userRepository.updateUserNoHpByEmail(email, noHp);
    const receipentEmail: receipentEmail = {
      Email: user.incoming_email_change,
      Name: user.full_name,
    };
    await SendMailJet(
      'ikhromax@gmail.com',
      [receipentEmail],
      `Your OTP: ${user.nohp_otp}`,
    );
    return user;
  }
  public async verifyNoHp(email: string, otp: string): Promise<User> {
    return await this.userRepository.verifyNoHp(email, otp);
  }
}
