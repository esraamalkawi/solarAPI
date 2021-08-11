const express = require("express");
const passport = require("passport");

const router = express.Router();

const { userUpdate } = require("../controllers/userController");

router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userUpdate
);

module.exports = router;
