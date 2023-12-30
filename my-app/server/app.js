const express = require("express");
const apiRoutes = require("./src/routes/apiRoutes");
const connectDatabase = require("./src/connect/connectDatabase");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

// connecting database
connectDatabase();

// routing
app.use("/", apiRoutes);

// connecting server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
