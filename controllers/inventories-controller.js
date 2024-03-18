const knex = require("knex")(require("../knexfile"));

const updateInventory = async (req, res) => {
	// checking if all field were filled
	if (
		!req.body.item_name ||
		!req.body.description ||
		!req.body.category ||
		!req.body.status ||
		!req.body.quantity
	) {
		return res.status(400).json({
			message: `Please complete all required fields`, // maybe modify wording later
		});
	}

	// checking if quantity entered is a number
	if (typeof req.body.quantity !== "number") {
		return res.status(400).json({
			message: `Quantity needs to be a number`,
		});
	}

	try {
		const rowsUpdated = await knex("inventories")
			.where({
				id: req.params.id,
			})
			.update(req.body);

		// checking if the inventory ID exists in the table
		if (rowsUpdated === 0) {
			return res.status(404).json({
				message: `Inventory with ID ${req.params.id} not found`,
			});
		}

		const updatedInventory = await knex("inventories").where({
			id: req.params.id,
		});

		// checking if the warehouse_id value exists in the warehouses table
		const warehouseId = updatedInventory[0].warehouse_id;
		const warehouseFound = await knex("warehouses").where({
			id: warehouseId,
		});
		if (warehouseFound.length === 0) {
			return res.status(400).json({
				message: `inventory warehouse with ID ${warehouseId} does not exist`,
			});
		}

		res.status(200).json(updatedInventory[0]);
	} catch (err) {
		res.status(500).json({
			message: `Unable to update inventory with ID ${req.params.id}: ${err}`,
		});
	}
};

module.exports = { updateInventory };
