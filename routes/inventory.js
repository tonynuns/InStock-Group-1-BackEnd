const router = require("express").Router();
const inventoryController = require("../controllers/inventories-controller");

router
    .route("/")
    .get(inventoryController.getInventories)
    .post(inventoryController.addNewInventoryItem);

router.route("/:id").put(inventoryController.updateInventory);

module.exports = router;
