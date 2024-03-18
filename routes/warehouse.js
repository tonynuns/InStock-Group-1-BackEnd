const router = require("express").Router();
const userController = require("../controllers/warehouses-controller");

router
	.route("/warehouses")
	.get(userController.getWareHouses)
	.post(userController.addNewWarehouse);

router
	.route("/warehouses/:id")
	.get(userController.findSingleWareHouse)
	.put(userController.updateWarehouse)
	.delete(userController.deleteWarehouse);

module.exports = router;
