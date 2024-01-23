import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('image', 64).notNullable();
    table.string('plate', 16).notNullable();
    table.string('manufacture', 64).notNullable();
    table.string('model', 64).notNullable();
    table.integer('rent_per_day').notNullable();
    table.integer('capacity').notNullable();
    table.string('description', 512).notNullable();
    table
      .dateTime('available_at', { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.string('transmission', 64).notNullable();
    table.boolean('available').defaultTo(true);
    table.string('type', 64).notNullable();
    table.integer('year').notNullable();
    table.specificType('options', 'VARCHAR(256)[]');
    table.specificType('specs', 'VARCHAR(256)[]');
    table.uuid('creator_id');
    table.foreign('creator_id').references('users.id').onDelete('SET NULL');
    table.uuid('last_updater_id');
    table
      .foreign('last_updater_id')
      .references('users.id')
      .onDelete('SET NULL');
    table.uuid('deleter_id');
    table.foreign('deleter_id').references('users.id').onDelete('SET NULL');
    table.timestamps(true, true);
    table.dateTime('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('cars');
}
