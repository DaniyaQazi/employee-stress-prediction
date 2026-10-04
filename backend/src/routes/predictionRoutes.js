const express = require("express");

const {
    createPrediction,
    getPredictionHistory,
    getAdminOverview,
} = require("../controllers/predictionController");

const {
    authenticateToken,
    requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, createPrediction);

router.get("/history", authenticateToken, getPredictionHistory);

router.get(
    "/admin/overview",
    authenticateToken,
    requireAdmin,
    getAdminOverview
);

module.exports = router;