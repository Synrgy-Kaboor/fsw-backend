import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('orderers', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.string('full_name', 100);
    table.string('title', 50);
    table.string('phone_number', 50);
    table.string('email', 50);

    table.bigint('booking_id');
    table.foreign('booking_id').references('bookings.id');
  });
}


export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('orderers');
}