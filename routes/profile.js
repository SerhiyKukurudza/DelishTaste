const express = require("express");
const profileController = require("../controllers/profile");

const router = express.Router();

router.post("/updatePersonalDetails", profileController.updatePersonalDetails);

router.post("/updatePassword", profileController.updatePassword);

module.exports = router;
