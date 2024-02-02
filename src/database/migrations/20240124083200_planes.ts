import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('planes', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('code', 50).notNullable();
    table.string('name', 255);
    table.integer('capacity_economy').notNullable().defaultTo(0);
    table.integer('capacity_economy_premium').notNullable().defaultTo(0);
    table.integer('capacity_business').notNullable().defaultTo(0);
    table.integer('capacity_first_class').notNullable().defaultTo(0);

    table.integer('airline_id').notNullable();
    table.foreign('airline_id').references('airlines.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('planes');
}