const router = require("express").Router();
const inventoryController = require("../controllers/inventories-controller");

router.get("/:id/inventories", inventoryController.getInventoriesByWarehouseId);

router
    .route("/")
    .get(inventoryController.getInventories)
    .post(inventoryController.addNewInventoryItem);

router.route("/:id").put(inventoryController.updateInventory);

module.exports = router;
