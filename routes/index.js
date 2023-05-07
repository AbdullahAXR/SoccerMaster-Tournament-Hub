var express = require('express');
var router = express.Router();
let path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sqlite.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("Getting error " + err.message);
    }
    else {
        console.log("Connected to the SQLite database.");
    }
});

router.get('/', (req, res) => {
    db.all('SELECT * FROM tournament', (err, rows) => {
        if (err) {
        console.error(err.message);
        res.status(500).send('Something went wrong');
    } else {
        res.render('index',{ myObj: rows } )
        console.log({ myObj: rows },'Users retrieved successfully');   
    }
    });
    
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});
    
// db.run("SELECT * FROM tournament")

// router.get('/', function(req, res, next) { 
//     // db.serialize(() => {
//     //     let array = []
//     //     db.each('SELECT * FROM tournament', (err, row) => {
//     //       if (err) {
//     //         console.error(err.message);
//     //       }
//     //       array.push(row)
//     //     });
//     //   });
//     // res.send(array)
    // res.sendFile(path.join(__dirname, '../views', 'index.html'));
// });

module.exports = router;