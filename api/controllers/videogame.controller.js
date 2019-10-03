'use strict';

var controllerHelper = require('../helpers/controller.helper');
const {Videogames} = require('../models');

// Module Name
const MODULE_NAME = '[VideoGame Controller]';
// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Vdeo game not found';
// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Video game deleted successfully';

function getVideoGames(req, res) {
    try {

        Videogames.findAll()
            .then(videoGameList => res.status(200).send(videoGameList))
            .catch(error => res.status(500).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getVideoGames.name, error, res);
    }
}

function createVideoGame(req, res) {

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
        }).then(videoGames => res.status(201).send(videoGames))
            .catch(error => res.status(400).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, createVideoGame.name, error, res);
    }

}

function getVideoGameById(req, res) {
    try {

        var id = req.swagger.params.id.value;

        Videogames.findByPk(id)
            .then(videoGame => res.status(200).send(videoGame));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getVideoGameById.name, error, res);
    }
}

function deleteVideoGame(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var id = req.swagger.params.id.value;

    Videogames.findByPk(id).then(videoGame => {
        if (!videoGame) {
            res.status(200).send({"success": 0, "description": "not found !"});
        } else {
            return videoGame.destroy()
                .then(() => res.status(200).send({"success": 1, "description": "deleted!"}))
                .catch(() => res.status(403).send({"success": 0, "description": "error !"}));
        }
    }).catch(error => console.log("There was an error: " + error));
}

function updateVideoGame(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var id = req.swagger.params.id.value;
        var parameters = req.body;

        Videogames.findByPk(id).then(videoGame => {
                if (!videoGame) {
                    res.status(401).send(({}));
                }
                return videoGame.update({
                    name: parameters.name,
                    developer: parameters.developer,
                    gamesystem: parameters.gamesystem,
                    genre: parameters.genre,
                    year: parameters.year
                    }).then(() => res.status(200).send(videoGame))
                    .catch(error => res.status(403).send(videoGame));
            }).catch(error => console.log("There was an error: " + error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updateVideoGame.name, error, res);
    }
}

module.exports =
{
    getVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame,
    GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
};
