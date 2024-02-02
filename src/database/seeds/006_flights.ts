import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('flights').del();

  // Inserts seed entries
  await knex('flights').insert([
    {
      id: 1,
      plane_id: 1,
      origin_airport_id: 1,
      destination_airport_id: 2,
      departure_date_time: new Date(2024, 1, 25, 7),
      arrival_date_time: new Date(2024, 1, 25, 9)
    },
    {
      id: 2,
      plane_id: 2,
      origin_airport_id: 2,
      destination_airport_id: 1,
      departure_date_time: new Date(2024, 1, 25, 8),
      arrival_date_time: new Date(2024, 1, 25, 10)
    },
    {
      id: 3,
      plane_id: 3,
      origin_airport_id: 3,
      destination_airport_id: 4,
      departure_date_time: new Date(2024, 1, 25, 13),
      arrival_date_time: new Date(2024, 1, 25, 16)
    }
  ]);
}
