const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  userUpdate,
  userItemList,
  scoreUpdate,
  UserItemCreate,
} = require("../controllers/userController");
router.get(
  "/myItems",
  passport.authenticate("jwt", { session: false }),
  userItemList
);

router.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),

  userUpdate
);
router.put("/score", passport.authenticate("jwt", { session: false }), scoreUpdate);

router.post(
  "/myItems/:itemId",
  passport.authenticate("jwt", { session: false }),
  UserItemCreate
);
module.exports = router;
