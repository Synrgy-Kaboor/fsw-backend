import type { User } from '@models/UserModel';
import { RegisterRepository } from '@repositories/RegisterRepository';
import { generateOtp } from '@utils/generateOtp';
import { SendMailJet } from '@utils/sendMail';
import bcrypt from 'bcrypt';
const getNextFiveMinutesOnSeconds = (): number => {
  const currentSeconds = getCurrentSeconds();
  return currentSeconds + 300;
};

const getCurrentSeconds = (): number => {
  const now = new Date();
  return Math.floor(now.getTime() / 1000); // Convert milliseconds to seconds
};

export class RegisterService {
  private readonly saltRounds = 10;
  private readonly registerRepository = new RegisterRepository();
  public async register(user: Partial<User>): Promise<User> {
    user.password = user.password
      ? bcrypt.hashSync(user.password, this.saltRounds)
      : null;
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
}
