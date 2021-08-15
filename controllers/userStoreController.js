const { Cart, UserStore } = require("../db/models");

exports.checkout = async (req, res, next) => {
  const newOrder = await UserStore.create({ userId: req.user.id });
  const cart = req.body.map((item) => ({
    ...item,
    userStoreId: newOrder.id,
  }));

  await Cart.bulkCreate(cart);

  const finalOrder = {
    ...newOrder.toJSON(),
    items: req.body,
  };
  res.status(201).json(finalOrder);
};
