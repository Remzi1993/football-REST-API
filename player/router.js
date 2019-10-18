const { Router } = require('express');
const Player = require('./model');
const Team = require('../team/model')

const router = new Router();

// Create - POST should return a HTTP status 201 (Created) if correct/successful
// Create a new Player
router.post("/players", (req, res, next) => {
    // console.log("WHAT IS REQ.BODY", req.body)

    Player.create(req.body)
        .then(player => res.status(201).json(player))
        .catch(next)
});

// Read - GET should return a HTTP status 200 (OK) if correct/successful - GET and 200 are default
// Read all the Players
router.get('/players', (req, res, next) => {
    Player.findAll()
        .then(players => {
            res.json(players);
        })
        .catch(next);
});

router.get('/players/:playerId', (req, res, next) => {
    Player.findByPk(req.params.playerId, {
            include: [Team]
        })
        .then(player => {
            res.json(player);
        })
        .catch(next);
});

// Update/Modify - PATCH should return a HTTP status 200 (OK) or 204 (No Content) if correct/successful
// Update/modify a Player
router.patch("/players/:playerId", (req, res, next) => {
    Player.findByPk(req.params.playerId)
        .then(player => {
            if (player) {
                player
                    .update(req.body)
                    .then(player => res.status(204).json(player));
            } else {
                res.status(404).end();
            }
        })
        .catch(next);
});

router.put("/players/:playerId", (req, res, next) => {
    Player.findByPk(req.params.playerId)
        .then(player => {
            if (player) {
                player
                    .update(req.body)
                    .then(player => res.status(204).json(player));
            } else {
                res.status(404).end();
            }
        })
        .catch(next);
});

// Delete - DELETE should return a HTTP status 200 (OK) if something was successfully deleted
// Delete a Player
router.delete("/players/:playerId", (req, res, next) => {
    console.log(req.params);
    // console.log('params', req.params)
    // res.send('The route works!')

    Player.destroy({
            where: {
                id: req.params.playerId,
            }
        })
        .then(numDeleted => {
            if (numDeleted) {
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        })
        .catch(next);
});

module.exports = router;