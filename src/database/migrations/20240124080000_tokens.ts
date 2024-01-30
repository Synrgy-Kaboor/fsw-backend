import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('tokens', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.boolean('expired');
    table.string('token', 255);
    table.string('token_type', 255);
    table.bigint('user_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('tokens');
}
