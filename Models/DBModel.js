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

module.exports = {
  getAllTournaments,
  getTournamentsDetails,
} 

