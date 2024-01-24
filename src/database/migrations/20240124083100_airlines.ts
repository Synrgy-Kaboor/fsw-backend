import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('airlines', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('name', 255);
    table.string('image_url', 500);
  });
}

export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('airlines');
}