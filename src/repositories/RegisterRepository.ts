import { type User,  UserModel } from "@models/UserModel";

export class RegisterRepository {

    public async register(user: Partial<User>): Promise<User> {
        const findUser = await UserModel.query().where({ email: user.email }).first();
        if (findUser) {
            throw new Error("User already exists");
        }
        return await UserModel.query().insert(user);
    }
}