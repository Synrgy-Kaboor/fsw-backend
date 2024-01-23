import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('orders', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id');
    table.foreign('user_id').references('users.id').onDelete('SET NULL');
    table.uuid('car_id');
    table.foreign('car_id').references('cars.id').onDelete('SET NULL');
    table
      .dateTime('start_rent', { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime('finish_rent', { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.integer('price').notNullable();
    table.string('status', 16).notNullable().defaultTo('OK');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('orders');
}
