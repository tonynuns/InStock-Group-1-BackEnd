const router = require("express").Router();
const inventoryController = require("../controllers/inventories-controller");

router.route("/:id").put(inventoryController.updateInventory)
.post(inventoryController.addNewInventoryItem);

module.exports = router;
