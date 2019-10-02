'use strict';
module.exports = (sequelize, DataTypes) => {
  const Videogames = sequelize.define('Videogames', {
    name: DataTypes.STRING
  }, {});
  Videogames.associate = function(models) {
    // associations can be defined here
  };
  return Videogames;
};