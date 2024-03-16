const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
const PORT = process.env.PORT || 5050;

const wareHousesRoutes=require('./routes/warehouse');

app.use(express.json());


app.use('/api', wareHousesRoutes);

//app.use('/warehouses',wareHousesRoutes);
app.listen(PORT, () => {
	console.log(`running at http://localhost:${PORT}`);
});
