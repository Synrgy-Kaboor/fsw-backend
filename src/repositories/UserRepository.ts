import { type User, UserModel } from '@models/UserModel';

export class UserRepository {
  public async getPersonalInformationByEmail(email: string): Promise<UserModel> {
    return await UserModel.query()
      .select(
        'title',
        'full_name',
        'gender',
        'birth_day',
        'nation',
        'city',
        'address',
        'is_wni')
      .findOne({
        email
      })
      .throwIfNotFound();
  }

  public async updatePersonalInformationByEmail(email: string, user: Partial<User>): Promise<UserModel> {
    return await UserModel.query()
      .patch(user)
      .where({
        email
      })
      .returning('*')
      .first()
      .throwIfNotFound();
  }
}