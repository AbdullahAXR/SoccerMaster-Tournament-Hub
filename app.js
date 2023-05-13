const express = require('express')
const app = express()
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); 
nunjucks = require('nunjucks');
var cookieParser = require('cookie-parser');
const { 
  getAllTournaments,
  getTournamentsDetails,
  getUserDetails,
  createUser,
  getCoachName,
  getAllTeams,
  getTeam,
  getPlayers,
  deleteMatch,
  deletePlayer,
  deleteTeam,
  deleteTournament,
  addTournament,
  addTeam,
  addPlayer,
  addMatch,
  addRefree,
  addTeamCoach,
  editTournament,
  editTeam,
  editPlayer,
  editMatch,
  getTournamentName,
  getTournamentsDetailsForDelete,
  getPlayer,
} = require('./Models/DBModel')
const port = 3000

//Cookie
app.set('trust proxy', 1) 
app.use(upload.array());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({  
  name: `dbproject`,
  secret: 'some-secret',  
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // This will only work if you have https enabled!
    maxAge: 60000 // 1 min
  } 
}));

// Nunjuks
app.set('views','./views');
app.set('view engine', 'html');
nunjucks.configure('views/', {
    autoescape: false,
    express: app
});

//Index
app.get('/', async (req, res) => {
  const tournaments = await getAllTournaments()
  res.render('index', { tournaments : tournaments,  isLogged: req.session.logged});
})




/************************************************************************/
/************************************************************************/
/***************************PAGES ROUTES*********************************/
/************************************************************************/
/************************************************************************/


// LOGIN
app.get('/login', async function(req, res) { 
    res.render('login', {isLogged: req.session.logged});
});

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.post('/login', async function(req, res){
  const Users = await getUserDetails(req.body.email)
  var cond = true;
  if(!Users){
     res.redirect('/');
    }
  else {
      Users.filter( function(user){
  if (req.body.email === user.email) {
      if (req.body.password === user.password)
          cond = false;
           req.session.name = user.name
           req.session.admin = user.admin;
           req.session.logged = true;
           req.session.email = user.email;
           res.redirect(('/'));
        }});
  if(cond){
  res.render('login',{
      message: "User or password is wrong!", isLogged: req.session.logged});
  } 
} 
});

// LOGOUT
app.get('/logout', function(req, res) { 
  req.session.logged = false;
  res.redirect('/');
});

// ABOUT
app.get('/about', function(req, res) { 
  res.render('about',{isLogged: req.session.logged});
});

// SIGN UP
app.get('/signup', function(req, res) { 
    res.render('signup', {isLogged: req.session.logged});
});


app.post('/signup', async function(req, res){

    const Users = await getUserDetails(req.body.email)
    var cond = true;
    if(!req.body.email || !req.body.password){
       res.status("400");
       res.send("Invalid details!");
    } else {
        Users.filter(function(user){
    if (req.body.email === user.email) {
              cond = false;
             res.render('signup', {
            message: "User Already Exists! Login or choose another user id", isLogged: req.session.logged});
          }});
    if(cond){
    var newUser = {email: req.body.email, password: req.body.password, name:req.body.name, isAdmin: req.body.admin};
    const createuser =  await createUser(newUser)
    res.redirect("/");
}
    } 
});


// TEAM DETAILS 
// app.get("/view-team-details/:team_id/:tr_id", async (req, res) => {
//   const team_id = req.params.team_id
//   const tr_id = req.params.tr_id
//   const team = await getTeam(team_id,tr_id)
//   const players = await getPlayers(team_id)
//   // res.render("view-team-details" ,{team: team[0] , players: players , isLogged: req.session.logged});
//   const coach_name = await getCoachName(team_id,tr_id)
//   // console.log(coach_name)
//   res.render("view-team-details" ,{team: team[0] , players: players, coach_name: coach_name[0], isLogged: req.session.logged});
// });

// MANAGE TEAMS
app.get('/manage-teams', async function(req, res, next) { 
  const teams = await getAllTeams()
  res.render('manage-teams.html', { teams : teams, isLogged: req.session.logged});
});

// TEAM DETAILS
app.get("/u-team-details/:team_id/:tr_id", async (req, res) => {
  const team_id = req.params.team_id
  const tr_id = req.params.tr_id
  const team = await getTeam(team_id,tr_id)
  const players = await getPlayers(team_id)
  const coach_name = await getCoachName(team_id,tr_id)
  res.render("u-team-details" ,{team: team[0] , players: players, coach_name: coach_name[0], isLogged: req.session.logged});
});

// MANAGE TOURNAMENTS
app.get('/manage-tournaments', async (req, res) => {
  const tournaments = await getAllTournaments()
  res.render('manage-tournaments', { tournaments : tournaments,  isLogged: req.session.logged});
})

// TOURNAMENTS DETAILS
app.get('/u-tournament-details/:tr_id', async (req, res) => {
  const tr_id = req.params.tr_id
  const teams = await getTournamentsDetails(tr_id)
  res.render('u-tournament-details', { teams : teams,  isLogged: req.session.logged});
})

//  Delete TOURNAMENT
app.get('/delete-tournament-details/:tr_id', async (req, res) => {
  const tr_id = req.params.tr_id
  const tournament = await getTournamentsDetailsForDelete(tr_id)
  res.render('delete-tournament-details', { tournament : tournament[0],  isLogged: req.session.logged});
})

app.get('/delete-tournament-details/:tr_id/:Confirm', async function(req, res){
  if(req.params.Confirm == "true"){
  const tournament = await deleteTournament(req.params.tr_id)
  }
  res.redirect("/manage-tournaments");
  
});

//  Delete Team
app.get('/delete-team-details/:team_id/:tr_id/', async (req, res) => {
  const tr_id = req.params.tr_id
  const team_id = req.params.team_id

  const team = await getTeam(team_id,tr_id)
  res.render('delete-team-details', { team : team[0],  isLogged: req.session.logged});
})

app.get('/delete-team-details/:team_id/:tr_id/:Confirm', async function(req, res){
  if(req.params.Confirm == "true"){
  const tournament = await deleteTeam(req.params.team_id,req.params.tr_id)
  }
  res.redirect("/manage-teams");
  
});

//  Delete Player
app.get('/delete-player-details/:team_id/:player_id/:tr_id', async (req, res) => {
  const team_id = req.params.team_id
  const player_id = req.params.player_id
  const tr_id = req.params.tr_id

  const player = await getPlayer(team_id,player_id)
  res.render('delete-player-details', { player : player[0], tr_id:tr_id ,  isLogged: req.session.logged});
})

app.get('/delete-player-details/:team_id/:player_id/:tr_id/:Confirm', async function(req, res){

  const team_id = req.params.team_id
  const player_id = req.params.player_id
  const tr_id = req.params.tr_id
  const Confirm = req.params.Confirm
  if(Confirm == "true"){
    const player = await deletePlayer(team_id,player_id)
    console.log(player)
  }
  res.redirect("/team-details/"+team_id+"/"+tr_id);
  
});

//  Edit Tournament
app.get('/edit-tournament-details/:tr_id', async (req, res) => {
  const tr_id = req.params.tr_id
  const tournament = await getTournamentsDetailsForDelete(tr_id)
  res.render('edit-tournament-details', { tournament : tournament[0],  isLogged: req.session.logged});
})

app.post('/edit-tournament-details/:tr_id', async function(req, res){
  const tr_id = req.params.tr_id
  const tr_name = req.body.name
  const start_date = req.body.start_date
  const end_date = req.body.end_date


  const tournament = await editTournament(tr_id,tr_name,start_date,end_date)
  res.redirect("/manage-tournaments");

});

//  Edit team
app.get('/edit-team-details/:team_id/:tr_id', async (req, res) => {
  const tr_id = req.params.tr_id
  const team_id = req.params.team_id
  const team = await getTeam(team_id,tr_id)
  console.log(team)
  res.render('edit-team-details', { team : team[0],  isLogged: req.session.logged});
})

app.post('/edit-team-details/:team_id/:tr_id', async function(req, res){
  const team_id = req.params.team_id
  const tr_id = req.params.tr_id
  console.log(req.body.team_group)
  console.log(req.body.match_played)
  console.log(req.body.won)
  const tournament = await editTeam(team_id,tr_id,req.body)
  res.redirect("/manage-team");

});
// Edit Player
app.get('/edit-player-details/:team_id/:player_id/:tr_id', async (req, res) => {
  const tr_id = req.params.tr_id
  const team_id = req.params.team_id
  const player_id = req.params.player_id
  const player = await getPlayer(team_id,player_id)
  console.log(player)
  res.render('edit-player-details', { player : player[0],tr_id , isLogged: req.session.logged});
})

app.post('/edit-player-details/:team_id/:player_id/:tr_id', async function(req, res){
  const team_id = req.params.team_id
  const tr_id = req.params.tr_id
  const player_id = req.params.player_id
  console.log(req.body)
  const player = await editPlayer(player_id,team_id,req.body)

  res.redirect("/team-details/"+team_id+"/"+tr_id);

});

// team details
app.get("/team-details/:team_id/:tr_id", async (req, res) => {
  const team_id = req.params.team_id
  const tr_id = req.params.tr_id
  const team = await getTeam(team_id,tr_id)
  const players = await getPlayers(team_id)
  const coach_name = await getCoachName(team_id,tr_id)
  res.render("team-details" ,{team: team[0] , players: players, coach_name: coach_name[0], isLogged: req.session.logged});
});
// DASHBOARD
app.get('/dashboard', async (req, res) => {
  res.render('dashboard', { user: {
    name: req.session.name, admin: req.session.admin,
    email: req.session.email
  }, isLogged: req.session.logged});
})

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});