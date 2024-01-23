import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('orders').del();

  // Inserts seed entries
  await knex('orders').insert([
    {
      id: '5e649a79-4d62-4d2f-9c36-f41dc9c2e2ba',
      user_id: '2741babd-7c11-4bf3-806b-c1d08d58f6ef',
      car_id: '6e2bc663-5197-441a-957b-bc75e4a2da7c',
      start_rent: new Date(2023, 2, 1),
      finish_rent: new Date(2023, 2, 4),
      price: 450000,
      status: 'Selesai',
    },
    {
      id: '7c8124af-6c0e-4d80-9a98-c7f287be0a6f',
      user_id: '878322f2-e61a-484e-b077-05f35f8051a8',
      car_id: '9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77',
      start_rent: new Date(2023, 4, 11),
      finish_rent: new Date(2023, 4, 13),
      price: 600000,
      status: 'Selesai',
    },
    {
      id: 'bd13c09a-ea6b-4300-9be8-0c140ace209a',
      user_id: '2741babd-7c11-4bf3-806b-c1d08d58f6ef',
      car_id: 'bf6b5c43-1377-4ae0-8908-310c64266f81',
      start_rent: new Date(2023, 7, 15),
      finish_rent: new Date(2023, 7, 16),
      price: 1000000,
      status: 'Selesai',
    },
    {
      id: '14958976-ccca-4512-a2e6-0a1ad5d52563',
      user_id: '878322f2-e61a-484e-b077-05f35f8051a8',
      car_id: '5b67f1d7-92d4-41c7-8577-4435740aadf1',
      start_rent: new Date(2023, 11, 3),
      finish_rent: new Date(2023, 11, 7),
      price: 5200000,
      status: 'Ongoing',
    },
  ]);
}
