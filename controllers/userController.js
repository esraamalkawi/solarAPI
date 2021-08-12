const { UserItems } = require("../db/models");

exports.userItemList = async (req, res, next) => {
  try {
    const userItem = await UserItems.findAll({
      attributes: { exclude: ["createdAt"] },
    });
    res.json(userItem);
  } catch (error) {
    next(error);
  }
};

exports.userUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.user.update(req.body);
    res.status(201).json(req.user);
  } catch (error) {
    next(error);
  }
};
