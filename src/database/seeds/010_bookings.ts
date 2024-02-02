import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('bookings').del();

  // Inserts seed entries
  await knex('bookings').insert([
    {
      id: 1,
      outbound_flight_id: 1,
      return_flight_id: 2,
      creator_id: 1,
      payment_id: 1,
      voucher_id: 1,
      total_adult: 1,
      total_children: 1,
      total_baby: 1,
      class_code: 'E',
      add_baggage: true,
      add_travel_insurance: true,
      add_baggage_insurance: true,
      add_delay_protection: true
    },
    {
      id: 2,
      outbound_flight_id: 1,
      return_flight_id: 3,
      creator_id: 1,
      payment_id: 1,
      voucher_id: null,
      total_adult: 1,
      total_children: 1,
      total_baby: 1,
      class_code: 'E',
      add_baggage: false,
      add_travel_insurance: false,
      add_baggage_insurance: false,
      add_delay_protection: false
    }
  ]);
}
