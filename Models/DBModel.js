const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

const getDbConnection = async () => {
  return await sqlite.open({
    filename: './sqlite.db',
    driver: sqlite3.Database
  })
}

const getAllTournaments = async () => {
  const db = await getDbConnection();
  const tournaments = await db.all(`SELECT * FROM tournament`)
  await db.close()
  return tournaments
}

const getTournamentsDetails = async (id) => {
  const db = await getDbConnection();
  
  const teams = await db.all(`SELECT * FROM team JOIN tournament ON tournament.tr_id = team.tr_id WHERE tournament.tr_id = ${id}`)
  await db.close()
  return teams
}

const getUserDetails = async (email) => {
  const db = await getDbConnection();
  const user = await db.all(`SELECT * FROM Auth WHERE email = '${email}'`)
  await db.close()
  return user
}

const createUser = async (User) => {
  const db = await getDbConnection();
  const meta = await db.all(`INSERT INTO Auth (name,email,password,admin) 
  VALUES ('${User.name}','${User.email}','${User.password}','${User.isAdmin}')
  `)
  await db.close()
  return meta
}


const getCoachName = async (team_id,tr_id) =>{
  const db = await getDbConnection();
  const coach = await db.all('SELECT * FROM team JOIN coach join team_coaches WHERE team.team_id = 1214 AND team.team_id = team_coaches.team_id AND coach.coach_id = team_coaches.coach_id')
  await db.close()
  return coach
}


const getAllTeams = async () =>{
  const db = await getDbConnection();

  const teams = await db.all('SELECT * FROM team')
  await db.close()
  return teams
}

const getTeam = async (team_id,tr_id) =>{
  const db = await getDbConnection();
  const team = await db.all(`SELECT * FROM team WHERE team_id = '${team_id}' AND tr_id = '${tr_id}'`)
  await db.close()
  return team
} 
const getPlayers = async (team_id) =>{
  const db = await getDbConnection();
  const players = await db.all(`SELECT * FROM player WHERE team_id = '${team_id}'`)
  await db.close()
  return players
} 

module.exports = {
  getAllTournaments,
  getTournamentsDetails,
  getUserDetails,
  createUser,
  getCoachName,
  getAllTeams,
  getTeam,
  getPlayers,
} 

