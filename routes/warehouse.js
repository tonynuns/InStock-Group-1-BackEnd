const router = require('express').Router();
const userController = require('../controllers/warehouses-controller');


router
.route('/warehouses')
.get(userController.getWareHouses)



module.exports = router;