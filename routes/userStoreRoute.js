const express = require("express");
const passport = require("passport");
const { checkout } = require("../controllers/userStoreController");
const router = express.Router();

router.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  checkout
);

module.exports = router;
