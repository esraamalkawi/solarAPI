module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  Cart.associate = (models) => {
    models.UserStore.belongsToMany(models.Item, {
      through: Cart,
      foreignKey: "userStoreId",
    });
    models.Item.belongsToMany(models.UserStore, {
      through: Cart,
      foreignKey: "itemId",
    });
  };

  return Cart;
};
