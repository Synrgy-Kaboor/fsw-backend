import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('passports', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.string('passport_number', 100).notNullable();
    table.string('full_name', 100).notNullable();
    table.timestamp('expired_date', { useTz: false }).notNullable();
    table.string('nation', 50).notNullable();
    table.timestamps(true, true)
    table.timestamp('deleted_at');

    table.bigint('user_id');
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('passports');
}

