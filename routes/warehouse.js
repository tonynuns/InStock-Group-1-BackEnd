const router = require('express').Router();
const userController = require('../controllers/warehouses-controller');


router
.route('/warehouses')
.get(userController.getWareHouses);

router
.route('/warehouses/:id')
.get(userController.findSingleWareHouse)
.delete(userController.deleteWarehouse);





module.exports = router;