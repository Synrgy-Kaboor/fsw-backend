import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('airlines').del();

  // Inserts seed entries
  await knex('airlines').insert([
    {
      name: 'Garuda Indonesia',
      image_url: 'https://fsw-backend.fly.dev/garuda-indonesia.png'
    },
    {
      name: 'Air Asia',
      image_url: 'https://fsw-backend.fly.dev/air-asia.png'
    },
    {
      name: 'Citilink',
      image_url: 'https://fsw-backend.fly.dev/citilink.png'
    },
  ]);
}
