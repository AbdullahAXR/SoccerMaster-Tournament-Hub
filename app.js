const express = require('express')
const app = express()
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); 
nunjucks = require('nunjucks');
var cookieParser = require('cookie-parser');
const { getUserDetails } = require('./Models/DBModel')
const aboutRoute = require('./routes/about.js')
const dashboardRoute = require('./routes/dashboard.js')
const deleteMatchRoute = require('./routes/delete-match-details.js')
const deletePlayerRoute = require('./routes/delete-player-details.js')
const deleteTeamRoute = require('./routes/delete-team-details.js')
const deleteTournamentRoute = require('./routes/delete-tournament-details.js')
const editMatchRoute = require('./routes/edit-match-details.js')
const editPlayerRoute = require('./routes/edit-player-details.js')
const editTeamRoute = require('./routes/edit-team-details.js')
const editTournamentRoute = require('./routes/edit-tournament-details.js')
const mangeTeamsRoute = require('./routes/manage-teams.js')
const manageTournamentsRoute = require('./routes/manage-tournaments.js')
const signUpRoute = require('./routes/signup.js')
const uTeamDetailsRoute = require('./routes/u-team-details.js')
const uTournamentDetailsRoute = require('./routes/u-tournament-details.js')
const viewTeamDetailsRoute = require('./routes/view-team-details.js')
const viewTournamentDetailsRoute = require('./routes/view-tournament-details.js')
const { getAllTournaments,
} = require('./Models/DBModel')
const port = 3000
app.use('/about',aboutRoute)
app.use('/signup',signUpRoute)
app.use('/dashboard',dashboardRoute)
app.use('/delete-match-details',deleteMatchRoute)
app.use('/delete-player-details',deletePlayerRoute)
app.use('/delete-team-details',deleteTeamRoute)
app.use('/delete-tournament-details',deleteTournamentRoute)
app.use('/edit-match-details',editMatchRoute)
app.use('/edit-player-details',editPlayerRoute)
app.use('/edit-team-details',editTeamRoute)
app.use('/edit-tournament-details',editTournamentRoute)
app.use('/manage-teams',mangeTeamsRoute)
app.use('/manage-tournaments',manageTournamentsRoute)
app.use('/u-team-details',uTeamDetailsRoute)
app.use('/u-tournament-details',uTournamentDetailsRoute)
app.use('/view-team-details',viewTeamDetailsRoute)
app.use('/view-tournament-details',viewTournamentDetailsRoute)

//Cookie
app.set('trust proxy', 1) 
app.use(upload.array());
app.use(cookieParser());
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


app.set('views','./views');
app.set('view engine', 'html');
nunjucks.configure('views/', {
    autoescape: false,
    express: app
});

app.get('/', async (req, res) => {
  const tournaments = await getAllTournaments()
  res.render('index', { tournaments : tournaments,  isLogged: req.session.logged});
})


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

app.get('/logout', function(req, res) { 
  req.session.logged = false;
  res.redirect('/');
});


app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});