module.exports = (sequelize, DataTypes) => {
  const UserItem = sequelize.define("UserItems", {});

  UserItem.associate = (models) => {
    models.User.belongsToMany(models.Item, {
      through: UserItem,
      foreignKey: "userId",
    });
    models.Item.belongsToMany(models.User, {
      through: UserItem,
      foreignKey: "itemId",
    });
  };

  return UserItem;
};
