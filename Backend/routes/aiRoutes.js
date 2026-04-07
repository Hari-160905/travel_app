const express = require("express");
const router = express.Router();

const { travelAssistant } = require("../controllers/aiController");

router.post("/travel-assistant", travelAssistant);

module.exports = router;