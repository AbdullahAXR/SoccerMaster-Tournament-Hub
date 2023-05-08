const express = require('express')
const app = express()
//const indexRoute = require('./routes/index.js')
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
const loginRoute = require('./routes/login.js')
const logoutRoute = require('./routes/logout.js')
const mangeTeamsRoute = require('./routes/manage-teams.js')
const manageTournamentsRoute = require('./routes/manage-tournaments.js')
const signupRoute = require('./routes/signup.js')
const uTeamDetailsRoute = require('./routes/u-team-details.js')
const uTournamentDetailsRoute = require('./routes/u-tournament-details.js')
const viewTeamDetailsRoute = require('./routes/view-team-details.js')
const viewTournamentDetailsRoute = require('./routes/view-tournament-details.js')
const { getAllTournaments,
} = require('./Models/DBModel')
const port = 3005
nunjucks = require('nunjucks');



app.set('view engine', 'html');

nunjucks.configure('views/', {
    autoescape: false,
    express: app
});

app.get('/', async (req, res) => {
  const tournaments = await getAllTournaments()
  res.render('index', { tournaments : tournaments});
})

app.use('/about',aboutRoute)
app.use('/dashboard',dashboardRoute)
app.use('/delete-match-details',deleteMatchRoute)
app.use('/delete-player-details',deletePlayerRoute)
app.use('/delete-team-details',deleteTeamRoute)
app.use('/delete-tournament-details',deleteTournamentRoute)
app.use('/edit-match-details',editMatchRoute)
app.use('/edit-player-details',editPlayerRoute)
app.use('/edit-team-details',editTeamRoute)
app.use('/edit-tournament-details',editTournamentRoute)
app.use('/login',loginRoute)
app.use('/logout',logoutRoute)
app.use('/manage-teams',mangeTeamsRoute)
app.use('/manage-tournaments',manageTournamentsRoute)
app.use('/signup',signupRoute)
app.use('/u-team-details',uTeamDetailsRoute)
app.use('/u-tournament-details',uTournamentDetailsRoute)
app.use('/view-team-details',viewTeamDetailsRoute)
app.use('/view-tournament-details',viewTournamentDetailsRoute)


app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});