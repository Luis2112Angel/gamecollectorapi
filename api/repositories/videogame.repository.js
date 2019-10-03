'use strict';

var _ = require('lodash');
var shortid = require('shortid');

////////////////////////////////////////////////////////////////////////////////
// PROPERTIES
////////////////////////////////////////////////////////////////////////////////

// Defines an initial set of videogames 
var videogames = [];

////////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function getVideogames(params) {

  var videogamesResult = videogames.slice();

  // Filter by name
  if (params.name !== undefined) {
    videogamesResult = _.filter(videogames, { name: params.name });
  }

  // Order by name
  if (params.sort !== undefined) {
    if (params.sort === 'name') {
      videogamesResult = _.orderBy(videogamesResult, ['name'], ['asc']);
    } else if (params.sort === '-name') {
      videogamesResult = _.orderBy(videogamesResult, ['name'], ['desc']);
    }
  }

  return videogamesResult;
}

function getVideogameById(id) {
  return videogames.find(element => {
    return element.id === id;
  });
}

function getVideogameByName(name) {
  return videogames.find(element => {
    return element.name === name;
  });
}

function createVideogame(videogameP) {

  var newVideogame = {
    id: shortid.generate(),
    name: videogameP.name,
    description: videogameP.description,
    image: videogameP.image
  };

  videogames.push(newVideogame);

  return getVideogameByPK(newVideogame.id);
}

function updateVideogame(videogameP) {

  var idToSearch = videogameP.id;

  var videogameToUpdate = getVideogameById(idToSearch);

  if (videogameToUpdate !== undefined) {
    videogameToUpdate.name = videogameP.name;
    videogameToUpdate.description = videogameP.description;
    videogameToUpdate.image = videogameP.image;
  }

  return videogameToUpdate;
}

function deleteVideogame(id) {

  var idToSearch = id;

  var videogameToDelete = getVideogameById(idToSearch);

  if (videogameToDelete !== undefined) {
    _.remove(videogames, function (element) {
      return element.id === videogameToDelete.id;
    });
    return true;
  } else {
    return false;
  }
}

function initDefaultVideogames(videogamesSet) {
  videogames = videogamesSet.slice();
}

module.exports = {
  getVideogames,
  getVideogameById,
  getVideogameByName,
  createVideogame,
  updateVideogame,
  deleteVideogame,
  initDefaultVideogames
}
