const express = require('express');
const app = express();
const connectServer = () => {
  try {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("server connecting error");
  }
};
module.exports = connectServer;
