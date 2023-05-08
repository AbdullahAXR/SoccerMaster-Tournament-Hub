var express = require('express');
var router = express.Router();
let path = require('path');
const { getAllTeams } = require('../Models/DBModel')
nunjucks = require('nunjucks');
router.get('/', async function(req, res, next) { 
    const teams = await getAllTeams()
    console.log(teams)
    res.render('manage-teams', { teams : teams});
});

module.exports = router;