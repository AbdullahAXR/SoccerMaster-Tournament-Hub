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

module.exports = {
  getAllTournaments,
  getTournamentsDetails,
  getUserDetails,
  createUser,
} 

