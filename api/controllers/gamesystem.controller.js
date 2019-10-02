'use strict';

var controllerHelper = require('../helpers/controller.helper');
const {Gamesystems} = require('../models');

// Module Name
const MODULE_NAME = '[GameSystem Controller]';
// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Game system not found';
// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Game system deleted successfully';

function getGameSystems(req, res) {
    try {

        Gamesystems.findAll()
            .then(gameSystemList => res.status(200).send(gameSystemList))
            .catch(error => res.status(500).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystems.name, error, res);
    }
}

function createGameSystem(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var parameters = req.body;

        return Gamesystems.create({
                name: parameters.name,
                description: parameters.description,
        }).then(gameSystems => res.status(201).send(gameSystems))
            .catch(error => res.status(400).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, createGameSystem.name, error, res);
    }

}

function getGameSystemById(req, res) {
    try {

        var id = req.swagger.params.id.value;

        Gamesystems.findByPk(id)
            .then(gameSystem => res.status(200).send(gameSystem));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystemById.name, error, res);
    }
}

function deleteGameSystem(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var id = req.swagger.params.id.value;

    Gamesystems.findByPk(id).then(gameSystem => {
        if (!gameSystem) {
            res.status(200).send({"success": 0, "description": "not found !"});
        } else {
            return gameSystem.destroy()
                .then(() => res.status(200).send({"success": 1, "description": "deleted!"}))
                .catch(() => res.status(403).send({"success": 0, "description": "error !"}));
        }
    }).catch(error => console.log("There was an error: " + error));
}

function updateGameSystem(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var id = req.swagger.params.id.value;
        var parameters = req.body;

        Gamesystems.findByPk(id).then(gameSystem => {
                if (!gameSystem) {
                    res.status(401).send(({}));
                }
                return gameSystem.update({
                        name: parameters.name,
                        description: parameters.description
                    }).then(() => res.status(200).send(gameSystem))
                    .catch(error => res.status(403).send(gameSystem));
            }).catch(error => console.log("There was an error: " + error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updateGameSystem.name, error, res);
    }
}

module.exports =
{
    getGameSystems,
    getGameSystemById,
    createGameSystem,
    updateGameSystem,
    deleteGameSystem,
    GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
};
