import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('planes').del();

  // Inserts seed entries
  await knex('planes').insert([
    {
      code: 'AC 2034',
      name: '',
      airline_id: 1,
      capacity_economy: 50,
      capacity_economy_premium: 30,
      capacity_business: 20,
      capacity_first_class: 10
    },
    {
      code: 'BD 6364',
      name: '',
      airline_id: 2,
      capacity_economy: 80,
      capacity_economy_premium: 30,
      capacity_business: 20,
      capacity_first_class: 10
    },
    {
      code: 'HD 2634',
      name: '',
      airline_id: 3,
      capacity_economy: 50,
      capacity_economy_premium: 0,
      capacity_business: 20,
      capacity_first_class: 10
    }
  ]);
}
