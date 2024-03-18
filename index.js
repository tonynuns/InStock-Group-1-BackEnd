const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

const wareHousesRoutes = require("./routes/warehouse");
app.use("/api/warehouses", wareHousesRoutes);

const inventoriesRoutes = require("./routes/inventory");
app.use("/api/inventories", inventoriesRoutes);

app.listen(PORT, () => {
	console.log(`running at http://localhost:${PORT}`);
});
