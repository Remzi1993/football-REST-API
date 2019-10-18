// All our imports 
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const teamRouter = require('./team/router');
const playerRouter = require('./player/router')
const Team = require('./team/model')
const Player = require('./player/model')
const db = require('./db')
const authRouter = require('./auth/router')

// Setup
const app = express();
const bodyParserMiddleWare = bodyParser.json()
const corsMiddleWare = cors()

const port = process.env.PORT || 4000;

// If req.body is undefined
// - use bodyparser
// - make sure to app.use(bodyparser) before doing app.use(blablRouter)
// - order matters here (wtf?) -> probably for a good reason 

app
    .use(corsMiddleWare)
    .use(bodyParserMiddleWare)
    .use(authRouter)
    .use(playerRouter)
    .use(teamRouter)
    .listen(port, () => {
        console.log(`App is listening on port ${port}`);
    });

db
    .sync({
        force: true
    })
    .then(() => {
        console.log('Database schema has been updated.');

        // simple seeding script
        // const team = Team.create({ name: 'Egel'})
        // const team2 = Team.create({ name: 'Das'})
        // return Promise.all([team, team2])

        // Script that iterates over arrays and creates rows in the database for them
        const teamNames = ['Egel', 'Das', 'Eagle', 'Pinguin']

        const teams = teamNames.map(teamName => Team.create({
            name: teamName
        }))
        return Promise.all(teams)
    })
    .then(() => {
        const players = [
            { name: 'Mimi', number: 4, teamId: 1 },
            { name: 'Wouter', number: 1, teamId: 2 },
            { name: 'David', number: 9, teamId: 3 },
            { name: 'Bram', number: 8, teamId: 4 },
            { name: 'Lisa', number: 10, teamId: 1 },
            { name: 'Miloud', number: 2, teamId: 2 },
            { name: 'Violeta', number: 3, teamId: 3 },
            { name: 'Johan', number: 5, teamId: 4 },
            { name: 'Danny', number: 6, teamId: 3 },
            { name: 'Rembert', number: 7, teamId: 2 },
            { name: 'Kelley', number: 10, teamId: 1 },
            { name: 'Jeroen', number: 12, teamId: 4 },
            { name: 'Rein', number: 11, teamId: 2 },
        ]

        const playerPromises = players.map((player) => Player.create(player))
        return Promise.all(playerPromises)
    })
    .catch(console.error);