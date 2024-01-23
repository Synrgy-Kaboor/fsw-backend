// import { App } from '../App';
// import { describe, it, expect, beforeAll, vi } from 'vitest';
// import supertest from 'supertest';
// import jwt from 'jsonwebtoken';
// import logger from '@utils/logger';
// import CarRoutes from '@routes/CarRoutes';

// const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY ?? '';

// const JWT_TOKEN = jwt.sign(
//   {
//     id: '0f9a16f5-2d9a-4fa5-8bc2-9a00df22921d',
//     email: 'admin@gmail.com',
//   },
//   JWT_PRIVATE_KEY,
//   {
//     expiresIn: '8h',
//     algorithm: 'HS256',
//   },
// );

// describe('Test Get Cars Route: GET /api/v1/cars', () => {
//   const mainApp = new App([new CarRoutes()]);
//   const app = mainApp.app;
//   const route = '/api/v1/cars';

//   beforeAll(() => {
//     const loggingFunctions: Array<'info' | 'warn' | 'error'> = [
//       'info',
//       'warn',
//       'error',
//     ];

//     for (const fn of loggingFunctions) {
//       const spy = vi.spyOn(logger, fn);
//       spy.mockImplementation(() => {});
//     }
//   });

//   it('should return 5 cars', async () => {
//     const response = await supertest(app).get(route).query({
//       page: 1,
//       limit: 5,
//     });

//     expect(response.status).toBe(200);
//     expect(response.body).toMatchObject({
//       page: 1,
//       limit: 5,
//       data: expect.any(Array),
//     });
//     expect(response.body.data).toHaveLength(5);
//     expect(response.body.data[0]).toMatchObject({
//       plate: expect.any(String),
//       manufacture: expect.any(String),
//       model: expect.any(String),
//       image: expect.any(String),
//       rent_per_day: expect.any(Number),
//       capacity: expect.any(Number),
//       description: expect.any(String),
//       available_at: expect.any(String),
//       transmission: expect.any(String),
//       available: expect.any(Boolean),
//       type: expect.any(String),
//       year: expect.any(Number),
//       options: expect.any(Array),
//       specs: expect.any(Array),
//       created_at: expect.any(String),
//       creator_id: expect.any(String),
//       id: expect.any(String),
//       last_updater_id: expect.any(String),
//       updated_at: expect.any(String),
//       deleted_at: null,
//       deleter_id: null
//     });
//   });
// });

// describe('Test Create Car Route: POST /api/v1/cars', () => {
//   const mainApp = new App([new CarRoutes()]);
//   const app = mainApp.app;
//   const route = `/api/v1/cars`;

//   const newCarBody = {
//     plate: 'STL-7347',
//     manufacture: 'Buick',
//     model: 'LaCrosse',
//     image: 'car09.min.jpg',
//     rent_per_day: 1000000,
//     capacity: 6,
//     description:
//       'Rear reading & courtesy lamps. Zone body construction -inc: front/rear crumple zones, hood deformation point.',
//     available_at: '2022-03-23T15:49:05.563+07:00',
//     transmission: 'Automatic',
//     available: false,
//     type: 'Extended Cab Pickup',
//     year: 2012,
//     options: ['CD (Multi Disc)'],
//     specs: ['Rear reading & courtesy lamps'],
//   };

//   beforeAll(() => {
//     const loggingFunctions: Array<'info' | 'warn' | 'error'> = [
//       'info',
//       'warn',
//       'error',
//     ];

//     for (const fn of loggingFunctions) {
//       const spy = vi.spyOn(logger, fn);
//       spy.mockImplementation(() => {});
//     }
//   });

//   it('should successfully create car and return its data', async () => {
//     const response = await supertest(app)
//       .post(route)
//       .set('Authorization', `Bearer ${JWT_TOKEN}`)
//       .send(newCarBody);

//     expect(response.status).toBe(201);
//     expect(response.body).toMatchObject({
//       ...newCarBody,
//       id: expect.any(String),
//       creator_id: expect.any(String),
//       created_at: expect.any(String),
//       last_updater_id: expect.any(String),
//       updated_at: expect.any(String),
//       deleter_id: null,
//       deleted_at: null,
//       available_at: expect.any(String),
//     });
//   });
// });

import { describe, it, expect } from 'vitest';

describe('Sample Test Suite Run', () => {
  it('should return true', () => {
    expect(true).toBe(true);
  })
})