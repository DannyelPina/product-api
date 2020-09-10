"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductsSchema extends Schema {
	up() {
		this.create("products", (table) => {
			table.increments();
			table.string("name", 100).notNullable();
			table.string("description", 255).notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop("products");
	}
}

module.exports = ProductsSchema;
