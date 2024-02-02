import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('flight_prices').del();

  // Inserts seed entries
  await knex('flight_prices').insert([
    {
      flight_id: 1,
      class_code: 'E',
      adult_price: 1000000,
      child_price: 1000000,
      baby_price: 100000
    },
    {
      flight_id: 1,
      class_code: 'EP',
      adult_price: 1500000,
      child_price: 1500000,
      baby_price: 100000
    },
    {
      flight_id: 1,
      class_code: 'B',
      adult_price: 2000000,
      child_price: 2000000,
      baby_price: 100000
    },
    {
      flight_id: 1,
      class_code: 'F',
      adult_price: 3000000,
      child_price: 3000000,
      baby_price: 100000
    },
    {
      flight_id: 2,
      class_code: 'E',
      adult_price: 1000000,
      child_price: 1000000,
      baby_price: 100000
    },
    {
      flight_id: 2,
      class_code: 'EP',
      adult_price: 1500000,
      child_price: 1500000,
      baby_price: 100000
    },
    {
      flight_id: 2,
      class_code: 'B',
      adult_price: 2000000,
      child_price: 2000000,
      baby_price: 100000
    },
    {
      flight_id: 2,
      class_code: 'F',
      adult_price: 3000000,
      child_price: 3000000,
      baby_price: 100000
    },
    {
      flight_id: 3,
      class_code: 'E',
      adult_price: 1600000,
      child_price: 1600000,
      baby_price: 125000
    },
    {
      flight_id: 3,
      class_code: 'EP',
      adult_price: 2000000,
      child_price: 2000000,
      baby_price: 125000
    },
    {
      flight_id: 3,
      class_code: 'B',
      adult_price: 3000000,
      child_price: 3000000,
      baby_price: 125000
    },
    {
      flight_id: 3,
      class_code: 'F',
      adult_price: 4500000,
      child_price: 4500000,
      baby_price: 125000
    },
  ]);
}
