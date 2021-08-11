const express = require("express");
const passport = require("passport");

const router = express.Router();

const { userUpdate, userItemList } = require("../controllers/userController");
router.get("/myItems", userItemList);
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userUpdate
);

module.exports = router;
