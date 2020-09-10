"use strict";
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const { test, trait } = use("Test/Suite")("Product");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("it should store product info into database", async ({
	assert,
	client,
}) => {
	let product = await Factory.model("App/Models/Product").create();

	product = product.toJSON();

	const result = await client.post("/product").send(product).end();

	result.assertStatus(201);

	assert.isDefined(result.body.id);
	assert.isDefined(result.body.name);
	assert.isDefined(result.body.description);
}).timeout(0);
