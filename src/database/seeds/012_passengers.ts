import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('passengers').del();

  // Inserts seed entries
  await knex('passengers').insert([
    {
      id: 1,
      booking_id: 1,
      full_name: 'Budi Bayu',
      title: 'Mr'
    },
    {
      id: 2,
      booking_id: 1,
      full_name: 'Pulu Pulu',
      title: 'Mrs'
    },
    {
      id: 3,
      booking_id: 1,
      full_name: 'Albert Polo',
      title: 'Mr'
    },
    {
      id: 4,
      booking_id: 2,
      full_name: 'Joko Joki',
      title: 'Mr'
    },
    {
      id: 5,
      booking_id: 2,
      full_name: 'Agnes Milo',
      title: 'Ms'
    },
    {
      id: 6,
      booking_id: 2,
      full_name: 'Chandra Sate',
      title: 'Mr'
    },
  ]);
}
