const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const connectDatabase = require("./connect/connectDatabase");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());
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
