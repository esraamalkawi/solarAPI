const express = require("express");
const passport = require("passport");

const router = express.Router();

const { signup, signin } = require("../controllers/authController");
const { userUpdate } = require("../controllers/userController");
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", signup);
// router.put(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   userUpdate
// );

module.exports = router;
