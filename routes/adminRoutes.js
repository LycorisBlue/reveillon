const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminControllers");

const service = "admin";

router.post("/controllers/" + service + "/create", adminController.createAdmin);
router.post("/controllers/" + service + "/authenticate", adminController.loginAdmin);

module.exports = router;