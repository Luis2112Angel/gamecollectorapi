'use strict';

var _ = require('lodash');

var gamesystemService = require('../services/gamesystem.service');
var videogameRepository = require('../repositories/videogame.repository');
var messageHelper = require('../helpers/message.helper');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Error Messages
const VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to create videogame. Videogame exists yet for the same gamesystem';
const VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found inserting a new videogame';
const VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND = 'Videogame not found updating a videogame';
const VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND = 'Videogame not found deleting a videogame';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function getVideogames(params) {
  var result = videogameRepository.getVideogames(params);
  return result;
}

function getVideogameById(id) {
  var result = videogameRepository.getVideogameById(id);
  return result;
}

function createVideogame(params) {

  var result;
  // Comprobamos si existe el gamesystem asociado

  var gamesystemFound = gamesystemService.getGameSystemByName(params.gamesystem);

  if (!_.isUndefined(gamesystemFound)) {

    // Comproamos que no exista para el mismo gamesystem el juego por nombre
    var videogamesFound = videogameRepository.getVideogames({ name: params.name, gamesystem: params.gamesystem })

    if (videogamesFound.length == 0) {
      result = videogameRepository.createVideogame(params);
    } else {
      result = messageHelper.buildErrorMessage(VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME);
    }
  } else {
    result = messageHelper.buildErrorMessage(VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND);
  }
  return result;
}

function updateVideogame(params) {

  var result = videogameRepository.updateVideogame(params);
  if (_.isUndefined(result)) {
    result = messageHelper.buildErrorMessage(VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND);
  }
  return result;
}

function deleteVideogame(id) {

  var bDeleted = videogameRepository.deleteVideogame(id);

  if (bDeleted) {
    return true;
  } else {
    return messageHelper.buildErrorMessage(VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND);
  }
}

module.exports = {
  getVideogames,
  getVideogameById,
  createVideogame,
  updateVideogame,
  deleteVideogame,
  VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME,
  VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND,
  VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND,
  VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND
}
