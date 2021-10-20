const express = require("express");
const router = express.Router();

//Users routes
const userRoutes = require("./user.api");
router.use("/users", userRoutes);

module.exports = router;