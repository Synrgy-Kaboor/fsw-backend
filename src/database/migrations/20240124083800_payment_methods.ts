import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('payment_methods', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('method_name', 255);
    table.string('image_url', 500);
    table.string('account_number', 50);
  });
}


export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('payment_methods');
}