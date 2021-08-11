const express = require("express");
const upload = require("../middleware/multer");
const passport = require("passport");

const router = express.Router();

const {
  itemDelete,
  itemList,

  itemCreate,
  fetchItem,
} = require("../controllers/itemController");

router.param("itemId", async (req, res, next, itemId) => {
  const item = await fetchItem(itemId, next);
  if (item) {
    req.item = item;
    next();
  } else {
    const err = new Error("Item Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", itemList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  itemCreate
);

router.delete(
  "/:itemId",
  passport.authenticate("jwt", { session: false }),
  itemDelete
);

module.exports = router;
