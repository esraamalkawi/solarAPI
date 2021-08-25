const express = require("express");
const router = express.Router();

const {
  videoList,
  fetchVideo,
  videoCreate
} = require("../controllers/videoController");

router.param("videoID", async (req, res, next, videoID) => {
  const video = await fetchVideo(videoID, next);
  if (video) {
    req.video = video;
    next();
  } else {
    const err = new Error("Video Not Found");
    err.status = 404;
    next(err);
  }
});
router.post("/", videoCreate);

router.get("/", videoList);



module.exports = router;
