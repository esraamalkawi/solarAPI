module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define("Video", {
      video: {
        type: DataTypes.STRING,
        allowNull: false,
  
      },
          name:{
      type: DataTypes.STRING,
        allowNull: false,}

    });
    return Video;
  };
  