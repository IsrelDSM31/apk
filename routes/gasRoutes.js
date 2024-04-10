const express = require("express");
const { gasController } = require("../controllers/gasController"); 

// Router object
const router = express.Router();

// Routes
// DETECT GAS || POST
router.post("/Gas-Data", gasController);

// Export
module.exports = router;
