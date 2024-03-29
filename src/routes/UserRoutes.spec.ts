import { App } from 'App';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import logger from '@utils/logger';
import UserRoutes from './UserRoutes';
import supertest from 'supertest';
import { s3utils } from '@utils/s3utils';

const JWT_PRIVATE_KEY = Buffer.from(process.env.JWT_PRIVATE_KEY ?? '', 'base64');

const JWT_TOKEN = jwt.sign(
  {
    sub: 'user1@gmail.com',
  },
  JWT_PRIVATE_KEY,
  {
    expiresIn: '8h',
    algorithm: 'HS256'
  }
);

describe('Test Get Personal Information: GET /api/v1/user', () => {
  const mainApp = new App([new UserRoutes()]);
  const app = mainApp.app;
  const route = '/api/v1/user';

  beforeAll(() => {
    const loggingFunctions: Array<'info' | 'warn' | 'error'> = [
      'info',
      'warn',
      'error',
    ];

    for (const fn of loggingFunctions) {
      const spy = vi.spyOn(logger, fn);
      spy.mockImplementation(() => {});
    }

    const spyS3Get = vi.spyOn(s3utils, 'getFileUrl');
    spyS3Get.mockImplementation(async () => {return 'sample URL'});

    const spyS3Upload = vi.spyOn(s3utils, 'uploadFile');
    spyS3Upload.mockImplementation(async () => {});
  });

  it('should return user data', async () => {
    const response = await supertest(app)
      .get(route)
      .set('Authorization', `Bearer ${JWT_TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      code: 200,
      message: 'success',
      data: {
        title: expect.any(String),
        fullName: expect.any(String),
        gender: expect.any(String),
        birthday: expect.any(String),
        nation: expect.any(String),
        city: expect.any(String),
        address: expect.any(String),
        isWni: expect.any(Boolean)
      }
    });
  });
});

describe('Test Update Personal Information: PATCH /api/v1/user', () => {
  const mainApp = new App([new UserRoutes()]);
  const app = mainApp.app;
  const route = '/api/v1/user';

  beforeAll(() => {
    const loggingFunctions: Array<'info' | 'warn' | 'error'> = [
      'info',
      'warn',
      'error',
    ];

    for (const fn of loggingFunctions) {
      const spy = vi.spyOn(logger, fn);
      spy.mockImplementation(() => {});
    }
  });

  it('should successfully update user info', async () => {
    const newPersonalInfo = {
      title: 'Ms',
      fullName: 'Coki Combro',
      gender: 'P',
      birthday: '2020-01-21',
      nation: 'Malaysia',
      city: 'Kuala Lumpur',
      address: 'Jl. Nasi Lemak 5, blok YY',
      isWni: false,
      nik: '23492383241'
    };

    const response = await supertest(app)
      .patch(route)
      .set('Authorization', `Bearer ${JWT_TOKEN}`)
      .send(newPersonalInfo);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      code: 200,
      message: 'success',
      data: {
        ...newPersonalInfo,
        imageName: null,
        imageUrl: expect.any(String || null)
      }
    });
  });
});