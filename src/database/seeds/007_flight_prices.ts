import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('flight_prices').del();

  // Inserts seed entries
  await knex('flight_prices').insert([
    {
      id: 1,
      flight_id: 1,
      class_code: 'E',
      adult_price: 1000000,
      child_price: 1000000,
      baby_price: 100000
    },
    {
      id: 2,
      flight_id: 1,
      class_code: 'EP',
      adult_price: 1500000,
      child_price: 1500000,
      baby_price: 100000
    },
    {
      id: 3,
      flight_id: 1,
      class_code: 'B',
      adult_price: 2000000,
      child_price: 2000000,
      baby_price: 100000
    },
    {
      id: 4,
      flight_id: 1,
      class_code: 'F',
      adult_price: 3000000,
      child_price: 3000000,
      baby_price: 100000
    },
    {
      id: 5,
      flight_id: 1,
      class_code: 'E',
      adult_price: 1000000,
      child_price: 1000000,
      baby_price: 100000
    },
    {
      id: 6,
      flight_id: 1,
      class_code: 'EP',
      adult_price: 1500000,
      child_price: 1500000,
      baby_price: 100000
    },
    {
      id: 7,
      flight_id: 1,
      class_code: 'B',
      adult_price: 2000000,
      child_price: 2000000,
      baby_price: 100000
    },
    {
      id: 8,
      flight_id: 1,
      class_code: 'F',
      adult_price: 3000000,
      child_price: 3000000,
      baby_price: 100000
    },
    {
      id: 9,
      flight_id: 1,
      class_code: 'E',
      adult_price: 1600000,
      child_price: 1600000,
      baby_price: 125000
    },
    {
      id: 10,
      flight_id: 1,
      class_code: 'EP',
      adult_price: 2000000,
      child_price: 2000000,
      baby_price: 125000
    },
    {
      id: 11,
      flight_id: 1,
      class_code: 'B',
      adult_price: 3000000,
      child_price: 3000000,
      baby_price: 125000
    },
    {
      id: 12,
      flight_id: 1,
      class_code: 'F',
      adult_price: 4500000,
      child_price: 4500000,
      baby_price: 125000
    },
  ]);
}
