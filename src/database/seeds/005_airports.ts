import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('airports').del();

  // Inserts seed entries
  await knex('airports').insert([
    {
      city_id: 1,
      code: 'SUB',
      name: 'Juanda International Airport',
      timezone: 7
    },
    {
      city_id: 2,
      code: 'CGK',
      name: 'Soekarno-Hatta Interational Airport',
      timezone: 7
    },
    {
      city_id: 2,
      code: 'HLP',
      name: 'Halim Perdanakusuma International Airport',
      timezone: 7
    },
    {
      city_id: 3,
      code: 'PDG',
      name: 'Minangkabau International Airport',
      timezone: 8
    },
  ]);
}
