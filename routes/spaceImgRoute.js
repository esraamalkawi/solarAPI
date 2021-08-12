const express = require("express");
const upload = require("../middleware/multer");

const router = express.Router();

const {
  spaceImgList,

  spaceImgCreate,
  fetchSpaceImg,
} = require("../controllers/spaceImgController");

router.param("spaceImgID", async (req, res, next, spaceImgID) => {
  const spaceImg = await fetchSpaceImg(spaceImgID, next);
  if (spaceImg) {
    req.spaceImg = spaceImg;
    next();
  } else {
    const err = new Error("SpaceImg Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", spaceImgList);

router.post("/", upload.single("image"), spaceImgCreate);

module.exports = router;
