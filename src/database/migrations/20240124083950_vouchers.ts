import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('vouchers', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.string('code', 50).notNullable();
    table.string('title', 100).notNullable();
    table.string('description', 500);
    table.specificType('eligible_payment_methods', 'VARCHAR(50)[]').notNullable();
    table.integer('maximum_discount').notNullable();
    table.timestamp('expired_timestamp', { useTz: false });
  });
}

export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('vouchers');
}