module.exports = (sequelize, DataTypes) => {
  const UserItem = sequelize.define("UserItems", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

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

