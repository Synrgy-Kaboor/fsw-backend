import NoFileReceivedException from '@exceptions/NoFileReceivedException';
import type { User } from '@models/UserModel';
import { UserService } from '@services/UserService';
import { dateToString, stringToDate } from '@utils/dateUtils';
import { s3utils } from '@utils/s3utils';
import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { extname } from 'path';

interface IPersonalInfoBody {
  title: string;
  fullName: string;
  gender: string;
  birthday: string;
  nation: string;
  city: string;
  address: string;
  isWni: boolean;
  imageName: string;
  nik: string;
  imageUrl?: string;
  email?: string;
  phoneNumber?: string;
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
        nik: user.nik,
        nation: user.nation,
        city: user.city,
        address: user.address,
        isWni: user.is_wni,
        imageName: user.image_name,
        imageUrl: user.image_name ? await s3utils.getFileUrl('kaboor-profile', user.image_name) : '',
        email: user.email,
        phoneNumber: user.phone_number
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
        nik: req.body.nik,
        birth_day: req.body.birthday
          ? stringToDate(req.body.birthday)
          : undefined,
        nation: req.body.nation,
        city: req.body.city,
        address: req.body.address,
        is_wni: req.body.isWni,
        image_name: req.body.imageName
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
        nik: user.nik,
        nation: user.nation,
        city: user.city,
        address: user.address,
        isWni: user.is_wni,
        imageName: user.image_name,
        imageUrl: user.image_name ? await s3utils.getFileUrl('kaboor-profile', user.image_name) : ''
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

  public addProfileImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.file) {
        throw new NoFileReceivedException();
      }

      const fileName = randomUUID() + extname(req.file.originalname);
      
      await s3utils.uploadFile(
        'kaboor-profile', 
        fileName, 
        req.file.buffer, 
        req.file.mimetype
      );

      res.status(200).json({
        code: 200,
        message: 'success',
        data: {
          imageName: fileName,
          imageUrl: await s3utils.getFileUrl('kaboor-profile', fileName)
        }
      });
    } catch (e) {
      next(e);
    }
  }

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

  public updateEmailOtp = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ):Promise<void> => {
    try {
      await this.userService.updateEmailOtp(req.user.email);
      res.status(200).json({
        code: 200,
        message: 'success',
      });
    } catch (e) {
      next(e);
    }
  }

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

  public updateNoHpOtp = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ):Promise<void> => {
    try {
      await this.userService.updateNoHpOtp(req.user.email);
      res.status(200).json({
        code: 200,
        message: 'success',
      });
    } catch (e) {
      next(e);
    }
  }
  
}
