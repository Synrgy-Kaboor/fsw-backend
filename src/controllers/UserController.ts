import type { User } from '@models/UserModel';
import { UserService } from '@services/UserService';
import { dateToString, stringToDate } from '@utils/formatter';
import type { NextFunction, Request, Response } from 'express';

interface IPersonalInfoBody {
  title: string;
  fullName: string;
  gender: string;
  birthday: string;
  nation: string;
  city: string;
  address: string;
  isWni: boolean
}

export class UserController {
  private readonly userService = new UserService();

  public getPersonalInformation = async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.userService.getPersonalInformation(req.user.email);
      const responseData: IPersonalInfoBody = {
        title: user.title,
        fullName: user.full_name,
        gender: user.gender,
        birthday: dateToString(user.birth_day),
        nation: user.nation,
        city: user.city,
        address: user.address,
        isWni: user.is_wni
      }

      res.status(200).json(
        {
          code: 200,
          message: 'success',
          data: responseData
        }
      );
      next();
    } catch (e) {
      next(e);
    }
  }

  public updatePersonalInformation = async (
    req: Request<unknown, unknown, IPersonalInfoBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userInfo: Partial<User> = {
        title: req.body.title,
        full_name: req.body.fullName,
        gender: req.body.gender,
        birth_day: stringToDate(req.body.birthday),
        nation: req.body.nation,
        city: req.body.city,
        address: req.body.address,
        is_wni: req.body.isWni
      }

      const user = await this.userService.updatePersonalInformation(req.user.email, userInfo);
     
      const responseData: IPersonalInfoBody = {
        title: user.title,
        fullName: user.full_name,
        gender: user.gender,
        birthday: dateToString(user.birth_day),
        nation: user.nation,
        city: user.city,
        address: user.address,
        isWni: user.is_wni
      }

      res.status(200).json(
        {
          code: 200,
          message: 'success',
          data: responseData
        }
      );
      next();
    } catch (e) {
      next(e);
    }
  }
}