import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('payments').del();

  // Inserts seed entries
  await knex('payments').insert([
    {
      payment_method: 'BCA',
      total_price: 5660000,
      expired_time: new Date(Date.UTC(2024, 1, 20, 8)),
      payment_completed: true,
      payment_date_time: new Date(Date.UTC(2024, 1, 20, 9)),
      invoice_number: 'IV202422052436'
    },
    {
      payment_method: 'BRI',
      total_price: 3200000,
      expired_time: new Date(Date.UTC(2024, 1, 21, 8)),
      payment_completed: true,
      payment_date_time: new Date(Date.UTC(2024, 1, 21, 9)),
      invoice_number: 'IV202422155436'
    }
  ]);
}
