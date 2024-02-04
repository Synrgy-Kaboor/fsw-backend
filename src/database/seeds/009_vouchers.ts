import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('vouchers').del();

  // Inserts seed entries
  await knex('vouchers').insert([
    {
      code: 'JALANJALAN',
      title: 'Diskon 100rb untuk Pemesanan Tiket',
      description: 'Dapatkan diskonnya segera!',
      eligible_payment_methods: ['BCA', 'BRI', 'Mandiri'],
      maximum_discount: 100000,
      expired_time: new Date(2030, 1, 1)
    },
    {
      code: 'LIBURANBCA',
      title: 'Diskon 250rb untuk Pemesanan Tiket',
      description: 'Dapatkan diskonnya segera! Khusus Pelanggan BCA',
      eligible_payment_methods: ['BCA'],
      maximum_discount: 250000,
      expired_time: new Date(2025, 1, 1)
    }
  ]);
}
