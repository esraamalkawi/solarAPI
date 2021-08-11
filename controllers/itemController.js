const { Item } = require("../db/models");
const { UserItems } = require("../db/models");

exports.fetchItem = async (itemId, next) => {
  try {
    const foundItem = await Item.findByPk(itemId);
    return foundItem;
  } catch (error) {
    next(error);
  }
};

exports.itemList = async (req, res, next) => {
  try {
    const item = await Item.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.itemCreate = async (req, res, next) => {
  try {
    let users = JSON.parse(req.body.users);

    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    req.body = {
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
    };

    const newItem = await Item.create(req.body);
    console.log("new item", newItem.dataValues);
    const idsArry = users.map(
      (user) => (user = { userId: user, itemId: newItem.dataValues.id })
    );
    console.log(idsArry);
    UserItems.bulkCreate(idsArry);
    res.status(201).json(newItem.dataValues);
    console.log(newItem.dataValues);
  } catch (error) {
    next(error);
  }
};

exports.itemDelete = async (req, res, next) => {
  try {
    // await UserItems.destroy({ where: { itemId: req.item.id } });
    await req.item.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
