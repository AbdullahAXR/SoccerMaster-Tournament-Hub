var express = require('express');
var router = express.Router();
let path = require('path');
const { getTeam } = require('../Models/DBModel')
const { getPlayers } = require('../Models/DBModel')
nunjucks = require('nunjucks');

router.get("/:team_id/:tr_id", async (req, res) => {
    const team_id = req.params.team_id
    const tr_id = req.params.tr_id
    const team = await getTeam(team_id,tr_id)
    const players = await getPlayers(team_id)
    res.render("view-team-details" ,{team: team[0] , players: players});
});
module.exports = router;
