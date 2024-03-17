const router = require('express').Router();
const userController = require('../controllers/warehouses-controller');


router
.route('/warehouses')
.get(userController.getWareHouses);

router
.route('/warehouses/:id')
.get(userController.findSingleWareHouse)
.post(userController.addNewWarehouse);





module.exports = router;