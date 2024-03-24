const router = require("express").Router();
const warehouseController = require("../controllers/warehouses-controller");

router
	.route("/")
	.get(warehouseController.getWareHouses)
	.post(warehouseController.addNewWarehouse);

router
	.route("/:id")
	.get(warehouseController.findSingleWareHouse)
	.put(warehouseController.updateWarehouse)
	.delete(warehouseController.deleteWarehouse);

router
	.route("/:id/inventories")
	.get(warehouseController.getInventoriesByWarehouseId);

module.exports = router;
