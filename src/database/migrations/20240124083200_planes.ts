import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('planes', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('code', 50);
    table.string('name', 255);

    table.integer('airline_id').notNullable();
    table.foreign('airline_id').references('airlines.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('planes');
}