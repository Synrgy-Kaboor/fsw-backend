import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('passengers').del();

  // Inserts seed entries
  await knex('passengers').insert([
    {
      booking_id: 1,
      full_name: 'Budi Bayu',
      title: 'Mr'
    },
    {
      booking_id: 1,
      full_name: 'Pulu Pulu',
      title: 'Mrs'
    },
    {
      booking_id: 1,
      full_name: 'Albert Polo',
      title: 'Mr'
    },
    {
      booking_id: 2,
      full_name: 'Joko Joki',
      title: 'Mr'
    },
    {
      booking_id: 2,
      full_name: 'Agnes Milo',
      title: 'Ms'
    },
    {
      booking_id: 2,
      full_name: 'Chandra Sate',
      title: 'Mr'
    },
  ]);
}
