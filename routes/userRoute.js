const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  userUpdate,
  userItemList,
  scoreUpdate,
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
router.put("/test", scoreUpdate);
module.exports = router;
