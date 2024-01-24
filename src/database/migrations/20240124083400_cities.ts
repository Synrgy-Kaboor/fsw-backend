import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('cities', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('code', 50).notNullable();
    table.string('name', 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('cities');
}