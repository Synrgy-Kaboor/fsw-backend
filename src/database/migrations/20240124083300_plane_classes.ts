import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('plane_classes', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('class_code', 10);
    table.integer('kuota');

    table.integer('plane_id').notNullable();
    table.foreign('plane_id').references('planes.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('plane_classes');
}