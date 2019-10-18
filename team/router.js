const { Router } = require('express');
const Team = require('./model');
const Player = require('../player/model')

const router = new Router();

// Create - POST should return a HTTP status 201 (Created) if correct/successful
// Create a new team
router.post("/teams", (req, res, next) => {
    // console.log("WHAT IS REQ.BODY", req.body)

    Team.create(req.body)
        .then(team => res.status(201).json(team))
        .catch(next)
});

// Read - GET should return a HTTP status 200 (OK) if correct/successful - GET and 200 are default
// Read all the teams
router.get('/teams', (req, res, next) => {
    Team.findAll()
        .then(teams => {
            res.json(teams);
        })
        .catch(next);
});

router.get('/teams/:teamId', (req, res, next) => {
    Team.findByPk(req.params.teamId, {
            include: [Player]
        })
        .then(team => {
            res.json(team);
        })
        .catch(next);
});

// Update/Modify - PATCH should return a HTTP status 200 (OK) or 204 (No Content) if correct/successful
// Update/modify a team
router.patch("/teams/:teamId", (req, res, next) => {
    Team.findByPk(req.params.teamId)
        .then(team => {
            // console.log("team > ", team)
            if (team) {
                team
                    .update(req.body)
                    .then(team => res.status(204).json(team));
            } else {
                res.status(404).end();
            }
        })
        .catch(next);
});

router.put("/teams/:teamId", (req, res, next) => {
    Team.findByPk(req.params.teamId)
        .then(team => {
            if (team) {
                team
                    .update(req.body)
                    .then(team => res.status(204).json(team));
            } else {
                res.status(404).end();
            }
        })
        .catch(next);
});

// Delete - DELETE should return a HTTP status 200 (OK) if something was successfully deleted
// Delete a team
router.delete("/teams/:teamId", (req, res, next) => {
    console.log(req.params);
    // res.send('The route works!')

    Team.destroy({
            where: {
                id: req.params.teamId,
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