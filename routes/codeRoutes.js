const express = require('express');
const router = express.Router();
const codeController = require("../controllers/codeControllers");

const service = "code";

router.post("/controllers/" + service + "/create", codeController.createCode);
router.put("/controllers/" + service + "/disable", codeController.blockCode);

module.exports = router;