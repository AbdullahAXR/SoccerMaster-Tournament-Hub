var express = require('express');
var router = express.Router();
const { getTournamentsDetails } = require('../Models/DBModel')
nunjucks = require('nunjucks');

router.get("/:t_id/:t_name", async (req, res) => {
    const id = req.params.t_id
    const name = req.params.t_name
    const teams = await getTournamentsDetails(id)
    res.render("u-tournament-details" ,{t_name: name , teams:teams });
});

module.exports = router;