var express = require('express');
var router = express.Router();
let path = require('path');

router.get('/', function(req, res, next) { 
    res.sendFile(path.join(__dirname, '../views', 'view-team-details.html'));
});

module.exports = router;
