const Sequelize = require('sequelize');
const db = require('../db');

const Team = db.define("team", {
    name: Sequelize.STRING
});

// const Team = db.define("team", {
//     name: {
//         type: Sequelize.STRING,
//         field: "name",
//     },
// });

module.exports = Team;