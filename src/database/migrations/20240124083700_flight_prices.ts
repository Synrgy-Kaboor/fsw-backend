import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.createTable('flight_prices', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.integer('price').notNullable();
    table.integer('baggage_price');
    table.integer('travel_insurance_price');
    table.integer('baggage_insurance_price');
    table.integer('delay_protection_price');

    table.bigInteger('flight_id').notNullable();
    table.foreign('flight_id').references('flights.id');

    table.integer('plane_class_id').notNullable();
    table.foreign('plane_class_id').references('plane_classes.id');
  });
}


export async function down(knex: Knex): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return knex.schema.dropTable('flight_prices');
}