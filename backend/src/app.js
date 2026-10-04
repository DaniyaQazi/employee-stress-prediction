const express = require('express');
const cors = require('cors');

const app = express();
const healthRoutes = require("./routes/healthRoutes")
const employeeRoutes = require("./routes/employeeRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/health", healthRoutes)
app.use("/api/employees", employeeRoutes)
app.use("/api/predictions", predictionRoutes)
app.use("/api/auth", authRoutes);

module.exports = app;