const router = require("express").Router();
const inventoryController = require("../controllers/inventories-controller");

router
    .route("/")
    .get(inventoryController.getInventories)
    .post(inventoryController.createInventoryItem);

router
    .route("/:id")
    .put(inventoryController.updateInventory)
    .get(inventoryController.getSingleInventory);

module.exports = router;
