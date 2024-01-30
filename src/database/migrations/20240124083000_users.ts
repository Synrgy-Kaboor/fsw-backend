import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.string('email', 50).notNullable().unique();
    table.string('full_name', 100);
    table.string('password', 100).notNullable();
    table.string('phone_number', 50);
    table.string('role', 255);
    table.string('otp', 255);
    table.boolean('verified').notNullable().defaultTo(false);
    table.bigInteger('verify_deadlines').notNullable().defaultTo(0);
    table.string('request_for_change_password_otp', 255); 
    table.boolean('request_for_change_password_verified').notNullable().defaultTo(false);
    table.bigInteger('forget_password_verify_deadlines').notNullable().defaultTo(0);
    table.string('title', 50);
    table.string('gender', 50);
    table.date('birth_day');
    table.string('nation', 255);
    table.string('city', 255);
    table.string('address', 255);
    table.boolean('is_wni');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('users');
}
