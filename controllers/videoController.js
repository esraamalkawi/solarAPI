const { Video } = require("../db/models");

exports.fetchVideo = async (videoId, next) => {
  try {
    const foundVideo = await Video.findByPk(videoId);
    return foundVideo;
  } catch (error) {
    next(error);
  }
};


exports.videoCreate = async (req, res, next) => {
  let {name, video}= req.body
  try {
   
  
    const newVideo = await Video.create({name,video});
    res.status(201).json(newVideo);
  } catch (error) {
    next(error);
  }
};
exports.videoList = async (req, res, next) => {
  try {
    const video = await Video.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(video);
  } catch (error) {
    next(error);
  }
};

