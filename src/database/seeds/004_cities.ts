import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('cities').del();

  // Inserts seed entries
  await knex('cities').insert([
    {
      id: 1,
      code: 'SUB',
      name: 'Surabaya'
    },
    {
      id: 2,
      code: 'JKT',
      name: 'Jakarta'
    },
    {
      id: 3,
      code: 'PDG',
      name: 'Padang'
    },
  ]);
}
