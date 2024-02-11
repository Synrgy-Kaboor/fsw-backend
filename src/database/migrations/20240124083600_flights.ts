import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('flights', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.timestamp('departure_date_time', { useTz: false }).notNullable();
    table.timestamp('arrival_date_time', { useTz: false }).notNullable();
    table.string('departure_terminal', 50).notNullable();

    table.integer('plane_id').notNullable();
    table.foreign('plane_id').references('planes.id').onDelete('CASCADE');

    table.integer('origin_airport_id').notNullable();
    table.foreign('origin_airport_id').references('airports.id').onDelete('CASCADE');

    table.integer('destination_airport_id').notNullable();
    table.foreign('destination_airport_id').references('airports.id').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('flights');
}