const express = require('express');
const router = express.Router();
const getAllController = require("../controllers/getAllControllers");

const service1 = "admin";
const service2 = "code";
const service3 = "user";

router.get("/controllers/" + service1 + "/get-all", getAllController.admin);
router.get("/controllers/" + service2 + "/get-all", getAllController.code);
router.get("/controllers/" + service3 + "/get-all", getAllController.user);


module.exports = router;