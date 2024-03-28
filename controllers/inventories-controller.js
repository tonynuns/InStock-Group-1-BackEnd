const knex = require("knex")(require("../knexfile"));

const getInventories = async (_req, res) => {
    try {
        const data = await knex("inventories")
            .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
            .select(
                "inventories.*", 
                "warehouses.warehouse_name" 
            );
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving inventories: ${err}`);
    }
};

const getSingleInventory = async (req, res) => {
	try {
		const inventoryFound = await knex("inventories").where({
			id: req.params.id,
		});

		if (inventoryFound.length === 0) {
			return res.status(404).json({
				message: `Inventory with ID ${req.params.id} not found.`,
			});
		}

		const inventoryData = inventoryFound[0];
		res.status(200).json(inventoryData);
	} catch (error) {
		res.status(500).json({
			message: `Unable to retrieve inventory data for ID ${req.params.id}.`,
		});
	}
};

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

const createInventoryItem = async (req, res) => {
	if (
		!req.body.warehouse_id ||
		!req.body.item_name ||
		!req.body.description ||
		!req.body.category ||
		!req.body.status ||
		!req.body.quantity
	) {
		return res.status(400).json({
			message: `Please complete all required fields`,
		});
	}

	if (isNaN(req.body.quantity)) {
		return res.status(400).json({
			message: `Quantity needs to be a number`,
		});
	}

	try {
		const warehouseFound = await knex("warehouses").where({
			id: req.body.warehouse_id,
		});
		if (warehouseFound.length === 0) {
			return res.status(400).json({
				message: `inventory warehouse with ID ${req.body.warehouse_id} does not exist`,
			});
		}

		const createdInventoryItem = await knex("inventories").insert(req.body);
		const NewInventoryItemId = createdInventoryItem[0];

		const inventoryItemFound = await knex("inventories").where({
			id: NewInventoryItemId,
		});

		if (inventoryItemFound.length === 0) {
			return res.status(400).json({
				message: `inventory in warehouse with ID ${NewInventoryItemId} does not exist`,
			});
		}

		res.status(201).json(inventoryItemFound[0]);
	} catch (err) {
		res.status(500).json({
			message: `Unable to update inventory with ID ${req.params.id}: ${err}`,
		});
	}
};

const deleteInventory = async (req, res) => {
	try {
		const inventoryDeleted = await knex("inventories")
			.where({
				id: req.params.id,
			})
			.delete();

		if (inventoryDeleted === 0) {
			return res.status(404).json({
				message: `Inventory with ID ${req.params.id} not found.`,
			});
		}

		res.status(204).send();
	} catch (err) {
		res.status(500).json({
			message: `Unable to delete inventory with ID ${req.params.id}: ${err}`,
		});
	}
};

module.exports = {
	updateInventory,
	getInventories,
	createInventoryItem,
	getSingleInventory,
	deleteInventory,
};
