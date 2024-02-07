import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('bookings', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.integer('total_adult').notNullable();
    table.integer('total_children').notNullable();
    table.integer('total_baby').notNullable();
    table.string('class_code', 10).notNullable();
    table.boolean('add_baggage').defaultTo(false);
    table.boolean('add_travel_insurance').defaultTo(false);
    table.boolean('add_baggage_insurance').defaultTo(false);
    table.boolean('add_delay_protection').defaultTo(false);
    table.string('proof_of_payment_file_name', 255);
    table.string('ticket_file_name', 255);

    table.bigint('outbound_flight_id');
    table.foreign('outbound_flight_id').references('flights.id').onDelete('CASCADE');

    table.bigint('return_flight_id');
    table.foreign('return_flight_id').references('flights.id').onDelete('CASCADE');

    table.bigint('creator_id');
    table.foreign('creator_id').references('users.id').onDelete('CASCADE');

    table.bigint('payment_id');
    table.foreign('payment_id').references('payments.id').onDelete('CASCADE');

    table.bigint('voucher_id');
    table.foreign('voucher_id').references('vouchers.id').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('bookings');
}

