const express = require("express");

const {
    register,
    registerOrganization,
    login,
} = require("../controllers/authController");

const router = express.Router();


/* Employee registration */
router.post("/register", register);


/* Organization + Admin registration */
router.post(
    "/register-organization",
    registerOrganization
);


/* Login */
router.post("/login", login);


module.exports = router;