import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('airports').del();

  // Inserts seed entries
  await knex('airports').insert([
    {
      code: 'SUB',
      name: 'Juanda International Airport',
      timezone: 7
    },
    {
      code: 'CGK',
      name: 'Soekarno-Hatta Interational Airport',
      timezone: 7
    },
    {
      code: 'HLP',
      name: 'Halim Perdanakusuma International Airport',
      timezone: 7
    },
    {
      code: 'PDG',
      name: 'Minangkabau International Airport',
      timezone: 7
    },
    {
      code: 'MKQ',
      name: 'Mopah Internation Airport',
      timezone: 9
    },
    {
      code: 'DPS',
      name: 'I Gusti Ngurah Rai Internation Airport',
      timezone: 8
    }
  ]);
}
