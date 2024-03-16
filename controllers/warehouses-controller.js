const knex = require('knex')(require('../knexfile'));

const getWareHouses = async (_req, res) => {
  try {
    const data = await knex('warehouses');
    res.status(200).json('succesful',data);
    console.log(data);
  } catch(err) {
  
    res.status(400).send(`Error retrieving warehouses: ${err}`)
  }
}
module.exports = {
    getWareHouses,
  }