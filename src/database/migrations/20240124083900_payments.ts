import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('payments', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.integer('total_price').notNullable();
    table.timestamp('expired_time', { useTz: false });
    table.string('payment_method', 50);
    table.boolean('payment_completed').defaultTo(false);
    table.timestamp('payment_date_time', { useTz: false });
    table.string('invoice_number', 255);
  });
}


export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('payments');
}