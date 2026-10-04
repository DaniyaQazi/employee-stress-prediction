const express = require("express");
const { getEmployee } = require("../controllers/employeeController");

const router = express.Router();

router.get("/", getEmployee);

module.exports = router;