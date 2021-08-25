const express = require("express");

const router = express.Router();

const { payment } = require("../controllers/stripeController");

router.post("/payment", payment);
router.post("/create-payment-intent", payment);

module.exports = router;
