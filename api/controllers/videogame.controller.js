'use strict';

var controllerHelper = require('../helpers/controller.helper');
const {Videogames} = require('../models');

// Module Name
const MODULE_NAME = '[Videogame Controller]';
// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Video game not found';
// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Video game deleted successfully';

function getVideogames(req, res) {
    try {

        Videogames.findAll()
            .then(videogameList => res.status(200).send(videogameList))
            .catch(error => res.status(500).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getVideogames.name, error, res);
    }
}

function createVideogame(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var parameters = req.body;

        return Videogames.create({
                name: parameters.name,
                developer: parameters.developer,
                gamesystem: parameters.gamesystem,
                genre: parameters.genre,
                year: parameters.year,
        }).then(videogames => res.status(201).send(videogames))
            .catch(error => res.status(400).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, createVideogame.name, error, res);
    }

}

function getVideogameById(req, res) {
    try {

        var id = req.swagger.params.id.value;

        Videogames.findByPk(id)
            .then(videogame => res.status(200).send(videogame));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getVideogameById.name, error, res);
    }
}

function deleteVideogame(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var id = req.swagger.params.id.value;

    Videogames.findByPk(id).then(videogame => {
        if (!videogame) {
            res.status(200).send({"success": 0, "description": "not found !"});
        } else {
            return videogame.destroy()
                .then(() => res.status(200).send({"success": 1, "description": "deleted!"}))
                .catch(() => res.status(403).send({"success": 0, "description": "error !"}));
        }
    }).catch(error => console.log("There was an error: " + error));
}

function updateVideogame(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var id = req.swagger.params.id.value;
        var parameters = req.body;

        Videogames.findByPk(id).then(videogame => {
                if (!videogame) {
                    res.status(401).send(({}));
                }
                return videogame.update({
                    name: parameters.name,
                    developer: parameters.developer,
                    gamesystem: parameters.gamesystem,
                    genre: parameters.genre,
                    year: parameters.year
                    }).then(() => res.status(200).send(videogame))
                    .catch(error => res.status(403).send(videogame));
            }).catch(error => console.log("There was an error: " + error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updateVideogame.name, error, res);
    }
}

module.exports =
{
    getVideogames,
    getVideogameById,
    createVideogame,
    updateVideogame,
    deleteVideogame,
    GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
};
