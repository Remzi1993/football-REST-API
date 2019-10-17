const Sequelize = require('sequelize');
const db = require('../db');
const Team = require('../team/model');

const Player = db.define("player", {
    name: Sequelize.STRING,

});

Player.belongsTo(Team)
Team.hasMany(Player)



// const Team = db.define("team", {
//     name: {
//         type: Sequelize.STRING,
//         field: "name",
//     },
// });


module.exports = Player;