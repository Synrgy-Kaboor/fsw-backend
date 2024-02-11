import type { User } from '@models/UserModel';
import { RegisterRepository } from '@repositories/RegisterRepository';
import { generateOtp } from '@utils/generateOtp';
import { SendMailJet, receipentEmail } from '@utils/sendMail';
const getNextFiveMinutesOnSeconds = () => {
  const currentSeconds = getCurrentSeconds();
  return currentSeconds + 300;
};

const getCurrentSeconds = () => {
  const now = new Date();
  return Math.floor(now.getTime() / 1000); // Convert milliseconds to seconds
};

export class RegisterService {
  private JWT_PRIVATE_KEY = Buffer.from(
    process.env.JWT_PRIVATE_KEY ?? '',
    'base64',
  );
  private readonly registerRepository = new RegisterRepository();
  public async register(user: Partial<User>): Promise<User> {
    user.password
      ? (user.password = jwt.sign(user.password, this.JWT_PRIVATE_KEY))
      : null;
    user.otp = generateOtp(4);
    user.verify_deadlines = getNextFiveMinutesOnSeconds();
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
