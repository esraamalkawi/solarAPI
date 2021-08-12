module.exports = (sequelize, DataTypes) => {
  const SpaceImg = sequelize.define("SpaceImg", {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return SpaceImg;
};
