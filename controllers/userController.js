const { UserItems, User } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

exports.userItemList = async (req, res, next) => {
  try {
    const userItem = await UserItems.findAll({
      attributes: { exclude: ["createdAt"] },
      where: {
        userId: {
          [Op.eq]: req.user.id,
        },
      },
    });
    res.json(userItem);
  } catch (error) {
    next(error);
  }
};

exports.UserItemCreate = async (req, res, next) => {
  try {
    const newUserItem = await UserItems.create({
      name: req.body.name,
      itemId: req.params.itemId,
      userId: req.user.id,
    });
    res.status(201).json(newUserItem);
  } catch (error) {
    next(error);
  }
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    score: user.score,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.userUpdate = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    await req.user.update(req.body);
    const token = generateToken(req.user);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.scoreUpdate = async (req, res, next) => {
  try {
    // req.body = {
    //   username: req.body.username,
    //   score: req.body.score,

    // };
    await User.update(req.body, { where: { id: req.user.id } });
    res.status(201).json(req.body);
  } catch (error) {
    next(error);
  }
};
