// const express = require('express')
// var router = express.Router();
// const { getUserDetails, createUser } = require('../Models/DBModel')
// var bodyParser = require('body-parser');
// router.use(bodyParser.json())

// router.get('/', function(req, res) { 
//     res.render('signup.html');
// });

// router.use(express.urlencoded({ extended: false }))
// router.use(express.json())

// router.post('/', async function(req, res){

//     const Users = await getUserDetails(req.body.email)
//     var cond = true;
//     if(!req.body.email || !req.body.password){
//        res.status("400");
//        res.send("Invalid details!");
//     } else {
//         Users.filter(function(user){
//     if (req.body.email === user.email) {
//               cond = false;
//              res.render('signup', {
//             message: "User Already Exists! Login or choose another user id"});
//           }});
//     if(cond){
//     var newUser = {email: req.body.email, password: req.body.password, name:req.body.name, isAdmin: req.body.admin};
//     res.redirect("/");
// }
//     } 
// });

// module.exports = router;