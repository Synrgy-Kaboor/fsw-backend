import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      email: 'user1@gmail.com',
      password: '$2a$10$gpo2OUse0uGCNzBx1TuXjuCrSIN5w0FCnGl3you9BVpVzquqz2FsS', // password
      title: 'Mr',
      full_name: 'Budi Bayu',
      gender: 'L',
      birth_day: new Date(2002, 1, 20),
      nation: 'Indonesia',
      city: 'Surabaya',
      address: 'Jl. Pramuka Raya 5, blok XX',
      is_wni: true
    },
    {
      id: 2,
      email: 'user2@gmail.com',
      password: '$2a$10$gpo2OUse0uGCNzBx1TuXjuCrSIN5w0FCnGl3you9BVpVzquqz2FsS',
      title: 'Mr',
      full_name: 'Joko Joki',
      gender: 'L',
      birth_day: new Date(1990, 5, 10),
      nation: 'Indonesia',
      city: 'Surabaya',
      address: 'Jl. Budaya Raya 6, blok XX',
      is_wni: true
    },
    {
      id: 3,
      email: 'user3@gmail.com',
      password: '$2a$10$gpo2OUse0uGCNzBx1TuXjuCrSIN5w0FCnGl3you9BVpVzquqz2FsS',
      title: 'Ms',
      full_name: 'Mia Masha',
      gender: 'P',
      birth_day: new Date(1989, 2, 21),
      nation: 'Malaysia',
      city: 'Penang',
      address: 'Jl. Ayam Raya 5, blok XX',
      is_wni: false
    },
  ]);
}
