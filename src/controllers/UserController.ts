import type { User } from '@models/UserModel';
import { UserService } from '@services/UserService';
import { dateToString, stringToDate } from '@utils/dateUtils';
import type { NextFunction, Request, Response } from 'express';

interface IPersonalInfoBody {
  title: string;
  fullName: string;
  gender: string;
  birthday: string;
  nation: string;
  city: string;
  address: string;
  isWni: boolean;
}

interface changeEmailBody {
  email: string;
}

interface changeNoHpBody {
  noHp: string;
}

export class UserController {
  private readonly userService = new UserService();

  public getPersonalInformation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const email = req.user.email;
      const user = await this.userService.getPersonalInformation(email);
      const responseData: IPersonalInfoBody = {
        title: user.title,
        fullName: user.full_name,
        gender: user.gender,
        birthday: user.birth_day ? dateToString(user.birth_day) : '',
        nation: user.nation,
        city: user.city,
        address: user.address,
        isWni: user.is_wni,
      };

      res.status(200).json({
        code: 200,
        message: 'success',
        data: responseData,
      });
      next();
    } catch (e) {
      next(e);
    }
  };

  public updatePersonalInformation = async (
    req: Request<unknown, unknown, IPersonalInfoBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userInfo: Partial<User> = {
        title: req.body.title,
        full_name: req.body.fullName,
        gender: req.body.gender,
        birth_day: req.body.birthday
          ? stringToDate(req.body.birthday)
          : undefined,
        nation: req.body.nation,
        city: req.body.city,
        address: req.body.address,
        is_wni: req.body.isWni,
      };

      const user = await this.userService.updatePersonalInformation(
        req.user.email,
        userInfo,
      );

      const responseData: IPersonalInfoBody = {
        title: user.title,
        fullName: user.full_name,
        gender: user.gender,
        birthday: user.birth_day ? dateToString(user.birth_day) : '',
        nation: user.nation,
        city: user.city,
        address: user.address,
        isWni: user.is_wni,
      };

      res.status(200).json({
        code: 200,
        message: 'success',
        data: responseData,
      });
      next();
    } catch (e) {
      next(e);
    }
  };
  public updateEmail = async (
    req: Request<unknown, unknown, changeEmailBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userEmail: string = req.body.email;
      await this.userService.updateUserEmail(req.user.email, userEmail);
      res.status(200).json({
        code: 200,
        message: 'check otp in your email',
      });
    } catch (e) {
      next(e);
    }
  };
  public verifyEmail = async (
    req: Request<unknown, unknown, { otp: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const otp: string = req.body.otp;
      await this.userService.verifyEmail(req.user.email, otp);
      res.status(200).json({
        code: 200,
        message: 'success',
      });
    } catch (e) {
      next(e);
    }
  };
  public updateNoHp = async (
    req: Request<unknown, unknown, changeNoHpBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userNoHp: string = req.body.noHp;
      await this.userService.updateUserNoHp(req.user.email, userNoHp);
      res.status(200).json({
        code: 200,
        message: 'check otp in your email',
      });
    } catch (e) {
      next(e);
    }
  };
  public verifyNoHp = async (
    req: Request<unknown, unknown, { otp: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const otp: string = req.body.otp;
      await this.userService.verifyNoHp(req.user.email, otp);
      res.status(200).json({
        code: 200,
        message: 'success',
      });
    } catch (e) {
      next(e);
    }
  };
}
