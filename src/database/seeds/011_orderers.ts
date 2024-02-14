import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('orderers').del();

  // Inserts seed entries
  await knex('orderers').insert([
    {
      booking_id: 1,
      full_name: 'Budi Bayu',
      title: 'Mr',
      phone_number: '0294528375',
      email: 'user1@gmail.com'
    },
    {
      booking_id: 2,
      full_name: 'Joko Joki',
      title: 'Mr',
      phone_number: '085235244021',
      email: 'user2@gmail.com'
    }
  ]);
}
