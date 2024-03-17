const knex = require('knex')(require('../knexfile'));

const getWareHouses = async (_req, res) => {
    try {
        const data = await knex('warehouses');
        res.status(200).json(data);
        console.log(data);
    } catch (err) {

        res.status(400).send(`Error retrieving warehouses: ${err}`)
    }
}

const findSingleWareHouse = async (req, res) => {
    try {
        const wareHouseFound = await knex("warehouses")
            .where({ id: req.params.id });

        if (wareHouseFound.length === 0) {
            return res.status(404).json({
                message: `warehouse with ID ${req.params.id} not found`
            });
        }

        const wareHousesData = wareHouseFound[0];
        res.json(wareHousesData);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve wareHouses data for wareHouse with ID ${req.params.id}`,
        });
    }
};



const addNewWarehouse = async (req, res) => {
    if (!req.body.warehouse_name || !req.body.address || !req.body.city || !req.body.country || !req.body.contact_name || !req.body.contact_position || !req.body.contact_phone || !req.body.contact_email) {
      return res.status(400).json({
        message: `Please provide valid email address or phone number for the warehouse in the request`,
      });
    }
  
    try {
      const result = await knex("warehouses").insert(req.body);
  
      const newWarehouseId = result[0];
      const createdWarehouse = await knex("warehouses").where({ id: newWarehouseId });
  
      res.status(201).json(createdWarehouse);
    } catch (error) {
      res.status(500).json({
        message: `Unable to create new warehouse: ${error}`,
      });
    }
  };


module.exports = {
    getWareHouses,
    findSingleWareHouse,
    addNewWarehouse,
}