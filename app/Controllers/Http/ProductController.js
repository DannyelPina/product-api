"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use("App/Models/Product");

class ProductController {
	async store({ request, response }) {
		const requestData = request.only(["name", "description"]);
		try {
			const result = await Product.create(requestData);

			response.status(201).json(result);
		} catch (e) {
			response.status(500);
		}
	}
}

module.exports = ProductController;
