const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const bodyParserMiddleWare = bodyParser.json()
const port = process.env.PORT || 4000;

const teamRouter = require('./team/router');
const playerRouter = require('./player/router');

// If req.body is undefined
// - use bodyparser
// - make sure to app.use(bodyparser) before doing app.use(blablRouter)
// - order matters here (wtf?) -> probably for a good reason 

app
    .use(bodyParserMiddleWare)
    .use(teamRouter)
    .use(playerRouter)
    .listen(port, () => {
        console.log(`App is listening on port ${port}`);
    });