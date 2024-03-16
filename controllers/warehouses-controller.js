const knex = require('knex')(require('../knexfile'));

const getWareHouses = async (_req, res) => {
  try {
    const data = await knex('warehouses');
    res.status(200).json(data);
    console.log(data);
  } catch(err) {
  
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
module.exports = {
    getWareHouses,
    findSingleWareHouse,
  }