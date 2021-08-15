module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  //relations
  Item.associate = (models) => {
    models.User.hasMany(Item, {
      foreignKey: "userId",
      // allowNull: false,
      as: "item",
    });
    Item.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return Item;
};
