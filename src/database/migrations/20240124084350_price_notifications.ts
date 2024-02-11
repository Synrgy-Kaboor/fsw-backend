import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('price_notifications', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.integer('total_adult').notNullable();
    table.integer('total_children').notNullable();
    table.integer('total_baby').notNullable();
    table.string('class_code', 10).notNullable();
    table.integer('minimum_price').notNullable();
    table.integer('maximum_price').notNullable();
    table.timestamp('departure_date_time').notNullable();
    table.timestamp('arrival_date_tiem').notNullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at');

    table.integer('origin_airport_id').notNullable();
    table.foreign('origin_airport_id').references('airports.id').onDelete('CASCADE');

    table.integer('destination_airport_id').notNullable();
    table.foreign('destination_airport_id').references('airports.id').onDelete('CASCADE');

    table.bigint('user_id').notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('price_notifications');
}

