const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
	console.log(`running at http://localhost:${PORT}`);
});
