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

	const response = await client.post("/product").send(product).end();

	response.assertStatus(201);

	assert.isDefined(response.body.id);
	assert.isDefined(response.body.name);
	assert.isDefined(response.body.description);
}).timeout(0);

test("it should not store product info into the database if name is empty", async ({
	assert,
	client,
}) => {
	let product = await Factory.model("App/Models/Product").create({
		name: "",
	});

	product = product.toJSON();

	const response = await client.post("/product").send(product).end();

	response.assertStatus(400);
}).timeout(0);

test("it should not store product info into the database if description is empty", async ({
	assert,
	client,
}) => {
	let product = await Factory.model("App/Models/Product").create({
		description: "",
	});

	product = product.toJSON();

	const response = await client.post("/product").send(product).end();

	response.assertStatus(400);
}).timeout(0);

test("it should return all stored products", async ({ assert, client }) => {
	const response = await client.get("/product").end();

	response.assertStatus(200);
	assert.isArray(response.body);
}).timeout(0);

test("it should return one product if giving id is valid", async ({
	assert,
	client,
}) => {
	let product = await Factory.model("App/Models/Product").create();
	product = product.toJSON();

	const response = await client.get(`/product/${product.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset({
		id: product.id,
		name: product.name,
		description: product.description,
	});
}).timeout(0);

test("it should not return the product if giving id is invalid", async ({
	assert,
	client,
}) => {
	const response = await client.get(`/product/123456789`).end();

	response.assertStatus(204);
}).timeout(0);

test("it should update product info if product exist", async ({
	assert,
	client,
}) => {
	let product = await Factory.model("App/Models/Product").create();
	product = product.toJSON();

	const response = await client
		.put(`/product/${product.id}`)
		.send({
			name: "Monitor PHILIPS",
			description: "Monitor PHILIPS (27'' - Full HD - LED IPS)",
		})
		.end();

	response.assertStatus(200);

	assert.isDefined(response.body.id);
	assert.isDefined(response.body.name);
	assert.isDefined(response.body.description);

	assert.equal(response.body.name, "Monitor PHILIPS");
	assert.equal(
		response.body.description,
		"Monitor PHILIPS (27'' - Full HD - LED IPS)"
	);
}).timeout(0);

test("it should not update product info if product does not exist", async ({
	assert,
	client,
}) => {
	const response = await client
		.put(`/product/123456789`)
		.send({
			name: "Monitor PHILIPS",
			description: "Monitor PHILIPS (27'' - Full HD - LED IPS)",
		})
		.end();

	response.assertStatus(204);
}).timeout(0);

test("it should delete the product if giving id is valid", async ({
	assert,
	client,
}) => {
	let product = await Factory.model("App/Models/Product").create();
	product = product.toJSON();

	const response = await client.delete(`/product/${product.id}`).end();

	response.assertStatus(200);
});

test("it should not delete the product if giving id is invalid", async ({
	assert,
	client,
}) => {
	const response = await client.delete(`/product/123456789`).end();

	response.assertStatus(204);
});
