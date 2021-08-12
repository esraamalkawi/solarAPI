const { SpaceImg } = require("../db/models");

exports.fetchSpaceImg = async (spaceImgId, next) => {
  try {
    const foundImage = await SpaceImg.findByPk(spaceImgId);
    return foundImage;
  } catch (error) {
    next(error);
  }
};

exports.spaceImgList = async (req, res, next) => {
  try {
    const image = await SpaceImg.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(image);
  } catch (error) {
    next(error);
  }
};

exports.spaceImgCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    req.body = {
      image: req.body.image,
    };

    const newImage = await SpaceImg.create(req.body);
    res.status(201).json(newImage.dataValues);
  } catch (error) {
    next(error);
  }
};
