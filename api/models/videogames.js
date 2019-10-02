'use strict';
module.exports = (sequelize, DataTypes) => {
  const Videogames = sequelize.define('Videogames', {
    name: DataTypes.STRING,
    developer: DataTypes.STRING,
    gamesystem: DataTypes.STRING,
    genre: DataTypes.STRING,
    year: DataTypes.STRING
  }, {});
  Videogames.associate = function(models) {
    // associations can be defined here
  };
  return Videogames;
};