import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('payments').del();

  // Inserts seed entries
  await knex('payments').insert([
    {
      id: 1,
      payment_method: 'BCA',
      total_price: 4620000,
      expired_time: new Date(2024, 1, 20, 8),
      payment_completed: true,
      payment_date_time: new Date(2024, 1, 20, 9),
      invoice_number: 'IV202422052436'
    },
    {
      id: 2,
      payment_method: 'BRI',
      total_price: 2000000,
      expired_time: new Date(2024, 1, 21, 8),
      payment_completed: true,
      payment_date_time: new Date(2024, 1, 21, 9),
      invoice_number: 'IV202422155436'
    }
  ]);
}
