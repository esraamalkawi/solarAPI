const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  userUpdate,
  userItemList,
  scoreUpdate,
  UserItemCreate,
  myUser,
  checkout,
} = require("../controllers/userController");
router.get(
  "/myItems",
  passport.authenticate("jwt", { session: false }),
  userItemList
);
router.get(
  "/myUser",
  passport.authenticate("jwt", { session: false }),
  myUser
);

router.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),

  userUpdate
);
router.put(
  "/score",
  passport.authenticate("jwt", { session: false }),
  scoreUpdate
);

router.post(
  "/myItems/:itemId",
  passport.authenticate("jwt", { session: false }),
  UserItemCreate
);

router.post('/create-checkout-session',
passport.authenticate("jwt", { session: false }),
checkout
);

module.exports = router;
