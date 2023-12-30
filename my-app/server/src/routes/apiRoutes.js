const express = require("express");
const router = express.Router();
const controller = require("../controllers/apiController");
const verifyToken = require("../services/auth");

router.get("/data", verifyToken, controller.getData);
router.post("/data", verifyToken, controller.createData);
router.put("/data/:id", verifyToken, controller.updateData);
router.delete("/data/:id", verifyToken, controller.deleteData);

// Auth routes
router.post("/user/registration", controller.signUp);
router.post("/user/login", controller.Login);

//
router.post("/user/verify", controller.verifyUser);

module.exports = router;
