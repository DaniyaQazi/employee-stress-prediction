const express = require('express');
const router = express();

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API is Running Successfully"
    });
});

module.exports = router;