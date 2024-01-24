import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('passengers', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.string('full_name', 100).notNullable();
    table.string('title', 50).notNullable();

    table.bigint('booking_id');
    table.foreign('booking_id').references('bookings.id');
  });
}


export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('passengers');
}

