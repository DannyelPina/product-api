"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use("App/Models/Product");

class ProductController {
	async store({ request, response }) {
		try {
			const requestBody = request.only(["name", "description"]);

			if (!requestBody.name || !requestBody.description) {
				return response
					.status(400)
					.json({ message: "There are missing params" });
			}

			const result = await Product.create(requestBody);

			response.status(201).json(result);
		} catch (error) {
			response.status(500);
		}
	}

	async index({ response }) {
		try {
			const products = await Product.all();
			response.status(200).json(products);
		} catch (error) {
			response.status(500);
		}
	}

	async show({ params, response }) {
		try {
			const { id } = params;
			const product = await Product.find(id);
			response.status(200).json(product);
		} catch (error) {
			response.status(500);
		}
	}

	async update({ params, request, response }) {
		try {
			const { id } = params;
			const requestBody = request.only(["name", "description"]);

			if (!requestBody.name || !requestBody.description) {
				return response
					.status(400)
					.json({ message: "There are missing params" });
			}

			const product = await Product.findByOrFail("id", id);

			product.name = requestBody.name;
			product.description = requestBody.description;

			await product.save();

			response.status(200).json(product);
		} catch (error) {
			response.status(500);
		}
	}

	async delete({ params, response }) {
		try {
			const { id } = params;

			const product = await Product.findByOrFail("id", id);

			await product.delete();

			response.status(200).json({});
		} catch (error) {
			response.status(500);
		}
	}
}

module.exports = ProductController;
