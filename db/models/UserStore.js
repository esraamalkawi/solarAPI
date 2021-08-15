module.exports = (sequelize, DataTypes) => {
  const UserStore = sequelize.define("UserStore", {});
  UserStore.associate = (models) => {
    models.User.hasMany(UserStore, { foreignKey: "userId" });
    UserStore.belongsTo(models.User, { foreignKey: "userId" });
  };
  return UserStore;
};
