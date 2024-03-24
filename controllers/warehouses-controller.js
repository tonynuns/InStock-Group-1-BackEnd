const knex = require("knex")(require("../knexfile"));

const getWareHouses = async (_req, res) => {
	try {
		const data = await knex("warehouses");
		res.status(200).json(data);
	} catch (err) {
		res.status(400).send(`Error retrieving warehouses: ${err}`);
	}
};

const findSingleWareHouse = async (req, res) => {
	try {
		const wareHouseFound = await knex("warehouses").where({
			id: req.params.id,
		});

		if (wareHouseFound.length === 0) {
			return res.status(404).json({
				message: `warehouse with ID ${req.params.id} not found`,
			});
		}

		const wareHousesData = wareHouseFound[0];
		res.status(200).json(wareHousesData);
	} catch (error) {
		res.status(500).json({
			message: `Unable to retrieve wareHouses data for wareHouse with ID ${req.params.id}`,
		});
	}
};

const addNewWarehouse = async (req, res) => {
	if (
		!req.body.warehouse_name ||
		!req.body.address ||
		!req.body.city ||
		!req.body.country ||
		!req.body.contact_name ||
		!req.body.contact_position ||
		!req.body.contact_phone ||
		!req.body.contact_email
	) {
		return res.status(400).json({
			message: `Please review the information you have provide`,
		});
	}
	if (!req.body.contact_email.includes("@")) {
		return res.status(400).json({
			message: `Please provide a valid email for the warehouse in the request`,
		});
	}
	const phone = /^[0-9()+\- ]+$/;
	if (!phone.test(req.body.contact_phone)) {
		return res.status(400).json({
			message: `Please provide a valid phone number for the warehouse in the request`,
		});
	}

	try {
		const result = await knex("warehouses").insert(req.body);

		const newWarehouseId = result[0];
		const createdWarehouse = await knex("warehouses").where({
			id: newWarehouseId,
		});

		res.status(201).json(createdWarehouse);
	} catch (error) {
		res.status(500).json({
			message: `Unable to create new warehouse: ${error}`,
		});
	}
};

const updateWarehouse = async (req, res) => {
	if (
		!req.body.warehouse_name ||
		!req.body.address ||
		!req.body.city ||
		!req.body.country ||
		!req.body.contact_name ||
		!req.body.contact_position ||
		!req.body.contact_phone ||
		!req.body.contact_email
	) {
		return res.status(400).json({
			message: `Please review the information you have provide`,
		});
	}
	if (!req.body.contact_email.includes("@")) {
		return res.status(400).json({
			message: `Please provide a valid email for the warehouse in the request`,
		});
	}
	const phone = /^[0-9()+\- ]+$/;
	if (!phone.test(req.body.contact_phone)) {
		return res.status(400).json({
			message: `Please provide a valid phone number for the warehouse in the request`,
		});
	}

	try {
		const rowsUpdated = await knex("warehouses")
			.where({
				id: req.params.id,
			})
			.update(req.body);

		if (rowsUpdated === 0) {
			return res.status(404).json({
				message: `warehouse with ID ${req.params.id} not found`,
			});
		}

		const updatedWarehouse = await knex("warehouses").where({
			id: req.params.id,
		});
		res.status(200).json(updatedWarehouse[0]);
	} catch (err) {
		res.status(500).json({
			message: `Unable to update warehouse with ID ${req.params.id}: ${err}`,
		});
	}
};

const deleteWarehouse = async (req, res) => {
	try {
		const wareHouseDeleted = await knex("warehouses")
			.where({ id: req.params.id })
			.delete();

		if (wareHouseDeleted === 0) {
			return res
				.status(404)
				.json({ message: `warehouse with ID ${req.params.id} not found` });
		}

		res.sendStatus(204);
	} catch (error) {
		res.status(500).json({
			message: `Unable to delete warehouse: ${error}`,
		});
	}
};

const getInventoriesByWarehouseId = async (req, res) => {
	// Get warehouse ID from URL
	const { id } = req.params;
	try {
		//Check if a warehouse exists with the given ID
		const warehouse = await knex("warehouses").where("id", id).first();
		if (!warehouse) {
			return res.status(404).json({
				message: `Warehouse with ID ${id} not found`,
			});
		}

		//Get all inventories with the given warehouse ID
		const inventories = await knex("inventories").where("warehouse_id", id);
		res.status(200).json(inventories);
	} catch (error) {
		res.status(500).json({
			message: `Error retrieving inventories: ${err}`,
		});
	}
};

module.exports = {
	getWareHouses,
	findSingleWareHouse,
	addNewWarehouse,
	updateWarehouse,
	deleteWarehouse,
	getInventoriesByWarehouseId,
};
