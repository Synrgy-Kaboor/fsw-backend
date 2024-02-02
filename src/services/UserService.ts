import type { User } from '@models/UserModel';
import { UserRepository } from '@repositories/UserRepository';

export class UserService {
  private readonly userRepository = new UserRepository();

  public async getPersonalInformation(email: string): Promise<User> {
    return await this.userRepository.getPersonalInformationByEmail(email);
  }

  public async updatePersonalInformation(email: string, user: Partial<User>): Promise<User> {
    return await this.userRepository.updatePersonalInformationByEmail(email, user);
  }
}