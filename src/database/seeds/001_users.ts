import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      email: 'user1@gmail.com',
      password: '$2a$10$a80r.Z/5K5TvN7npjjOOde5pKDU42SNm9w8Ba6OdhReXer/SFUHJm', // password
    },
    {
      id: 2,
      email: 'user2@gmail.com',
      password: '$2a$10$7qwuuml2akFZEq7iI6zwq.e2xjsEjErawFs54DJA7mi6QBvXaDmm2',
    },
    {
      id: 3,
      email: 'user3@gmail.com',
      password: '$2a$10$DRpIMx/5eY1yic6.oijkHOIau9Je3g..9mcfvRen70aIRh.LlJrHS',
    },
  ]);
}
