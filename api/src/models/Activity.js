const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.INTEGER
    },
    duration: {
      type: DataTypes.STRING
    },
    season: {
      type: DataTypes.ENUM("summer", "autumn", "winter", "spring"),
    },
  }, {
    timestamps: false
  });
};