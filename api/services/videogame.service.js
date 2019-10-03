'use strict';

var _ = require('lodash');

var videogameRepository = require('../repositories/videogame.repository');
var gamesystemRepository = require('../repositories/gamesystem.repository');
var messageHelper = require('../helpers/message.helper');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Error Messages
const GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to create gamesystem. There is a gamesystem with the same name in the system';
const GS_SVC_ERR_UPDATE_GS_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to update gamesystem. There is a gamesystem with the same name to update in the system';
const GS_SVC_ERR_UPDATE_GS_NOT_FOUND_BY_ID = 'Not possible to update gamesystem. There is NOT a gamesystem with the same id to update'
const GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID = 'Not possible to delete gamesystem. Gamesystem not found';
const GS_SVC_ERR_DELETE_VG_EXISTS_ASSOCIATED = 'Not possible to delete gamesystem. There are videogames associated with the gamesystem';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function getVideoGames(params) {
  return videogameRepository.getVideoGames(params);
}

function getVideogameById(id) {
  return videogameRepository.getVideogameById(id);
}

function getVideogameByName(name) {
  return videogameRepository.getVideogameByName(name);
}

function createVideogame(params) {

  // Checks if exists a gamesystem with the same name - Using module.exports to call the function to ease the testing
  var videogameFound = module.exports.getVideogameByName(params.name);
  if (_.isUndefined(videogameFound)) {
    return videogameRepository.createVideogame(params);
  } else {
    return messageHelper.buildErrorMessage(GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME);
  }
}

function updateVideogame(params) {

  var result;
  // Checks if exists a gamesystem with the same id - Using module.exports to call the function to ease the testing
  var VideogameFoundById = module.exports.getVideogameById(params.id);
  if (!_.isUndefined(VideogameFoundById)) {

    // Then checks if exists a gamesystem with the same name. If exists, the id must be the same that the object in params
    var videogameFoundByName = module.exports.getVideogameByName(params.name);

    if (_.isUndefined(videogameFoundByName) || videogameFoundByName.id === params.id) {
      result = videogameRepository.updateVideogame(params);
    } else {
      result = messageHelper.buildErrorMessage(GS_SVC_ERR_UPDATE_GS_ALREADY_EXISTS_WITH_SAME_NAME);
    }
  } else {
    result = messageHelper.buildErrorMessage(GS_SVC_ERR_UPDATE_GS_NOT_FOUND_BY_ID);
  }

  return result;
}

function deleteVideogame(id) {

  var result;

  // First obtains the game system
  var myVideogame = module.exports.getVideogameById(id);

  if (!_.isUndefined(myVideogame)) {
    var filterParams = { videogame: myVideogame.name };
    var games = videogameRepository.getVideoGames(filterParams);

    if (!_.isUndefined(games) && games.length > 0) {
      result = messageHelper.buildErrorMessage(GS_SVC_ERR_DELETE_VG_EXISTS_ASSOCIATED);
    } else {
      var resultDeletion = gamesystemRepository.deleteGameSystem(id);
      if (resultDeletion) {
        result = true;
      } else {
        result = messageHelper.buildErrorMessage(GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID);
      }
    }
  } else {
    result = messageHelper.buildErrorMessage(GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID);
  }

  return result;
}

module.exports = {
  getVideoGames,
  getVideogameById,
  getVideogameByName,
  createVideogame,
  updateVideogame,
  deleteVideogame,
  GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME,
  GS_SVC_ERR_UPDATE_GS_ALREADY_EXISTS_WITH_SAME_NAME,
  GS_SVC_ERR_UPDATE_GS_NOT_FOUND_BY_ID,
  GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID,
  GS_SVC_ERR_DELETE_VG_EXISTS_ASSOCIATED
}