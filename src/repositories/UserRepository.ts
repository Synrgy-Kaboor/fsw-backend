import { type User, UserModel } from '@models/UserModel';

export class UserRepository {
  public async getPersonalInformationByEmail(email: string): Promise<User> {
    return await UserModel.query()
      .select(
        'title',
        'full_name',
        'gender',
        'birth_day',
        'nation',
        'city',
        'address',
        'is_wni',
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
      .patch({ email: newEmail })
      .where({ email })
      .returning('*')
      .first()
      .throwIfNotFound();
  }
}
