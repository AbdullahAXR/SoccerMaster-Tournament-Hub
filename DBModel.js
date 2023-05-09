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
  
  const teams = await db.all(`SELECT * FROM team JOIN tournament ON  tournament.tr_id = team.tr_id WHERE tournament.tr_id = ${id}`)
  await db.close()
  return teams
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
  const players = await db.all(`SELECT * FROM player JOIN playing_position WHERE player.position_to_play = playing_position.position_id AND team_id = '${team_id}'`)
  console.log(players)
  await db.close()
  return players
} 

const getCoachName = async (team_id,tr_id) =>{
  const db = await getDbConnection();
  const coach = await db.all(`SELECT * FROM team JOIN coach join team_coaches WHERE team.team_id = '${team_id}' AND team.team_id = team_coaches.team_id AND coach.tr_id = '${tr_id}'`)
  await db.close()
  return coach
}

const getTournamentName = async (tr_id) =>{
  const db = await getDbConnection();
  const tr_name = await db.all(`SELECT * FROM tournament WHERE tr_id = '${tr_id}'`)
  await db.close()
  return tr_name
}

const getMatches = async (tr_id) =>{ 
  const db = await getDbConnection();
  const matches = await db.all(`SELECT * FROM match_details WHERE tr_id = '${tr_id}'`)
  await db.close()
  return matches
}

module.exports = {
  getAllTournaments,
  getTournamentsDetails,
  getAllTeams,
  getTeam,
  getPlayers,
  getCoachName,
  getTournamentName,
} 

