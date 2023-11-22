const express = require('express');
const router = express.Router();
const userController = require("../controllers/userControllers");

const service = "user";

router.post("/controllers/" + service + "/create", userController.createUser);
router.post("/controllers/" + service + "/find", userController.findByBody);
router.post("/controllers/" + service + "/authenticate", userController.loginUser);


module.exports = router;