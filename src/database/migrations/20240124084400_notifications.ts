import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('notifications', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.string('type', 50).notNullable();
    table.string('title', 255).notNullable();
    table.string('detail', 1000);
    table.boolean('flag').defaultTo(false).notNullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at');

    table.bigInteger('price_notification_id').defaultTo(null);

    table.bigint('user_id');
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('notifications');
}

