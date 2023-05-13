const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

const getDbConnection = async () => {
  return await sqlite.open({
    filename: "./sqlite.db",
    driver: sqlite3.Database,
  });
};

const getAllTournaments = async () => {
  const db = await getDbConnection();
  const tournaments = await db.all(`SELECT * FROM tournament`);
  await db.close();
  return tournaments;
};

const getTournamentsDetails = async (id) => {
  const db = await getDbConnection();

  const teams = await db.all(`SELECT * FROM team JOIN tournament ON tournament.tr_id = team.tr_id WHERE tournament.tr_id = ${id}`);
  await db.close();
  return teams;
};

const getTournamentsDetailsForDelete = async (id) => {
  const db = await getDbConnection();
  const teams = await db.all(`SELECT * FROM tournament WHERE tournament.tr_id = ${id}`);
  await db.close();
  return teams;
};

const getUserDetails = async (email) => {
  const db = await getDbConnection();
  const user = await db.all(`SELECT * FROM Auth WHERE email = '${email}'`);
  await db.close();
  return user;
};

const createUser = async (User) => {
  const db = await getDbConnection();
  const meta = await db.all(`INSERT INTO Auth (name,email,password,admin) 
  VALUES ('${User.name}','${User.email}','${User.password}','${User.isAdmin}')
  `);
  await db.close();
  return meta;
};

// const getCoachName = async (team_id, tr_id) => {
//   const db = await getDbConnection();
//   const coach = await db.all(
//     "SELECT * FROM team JOIN coach join team_coaches WHERE team.team_id = 1214 AND team.team_id = team_coaches.team_id AND coach.coach_id = team_coaches.coach_id"
//   );
//   await db.close();
//   return coach;
// };

const getAllTeams = async () => {
  const db = await getDbConnection();

  const teams = await db.all("SELECT * FROM team");
  await db.close();
  return teams;
};

const getAllMatches = async (tr_id) => {
const db = await getDbConnection();
const matches = await db.all(`SELECT * FROM match_details WHERE tr_id = '${tr_id}'`);
await db.close();
return matches;
};

const getTeam = async (team_id, tr_id) => {
  const db = await getDbConnection();
  const team = await db.all(`SELECT * FROM team WHERE team_id = '${team_id}' AND tr_id = '${tr_id}'`);
  await db.close();
  return team;
};
const getPlayers = async (team_id) => {
  const db = await getDbConnection();
  const players = await db.all(`SELECT * FROM player WHERE team_id = '${team_id}'`);
  await db.close();
  return players;
};

const getCoachName = async (team_id,tr_id) =>{
  const db = await getDbConnection();
  const coach = await db.all(`SELECT * FROM team JOIN coach join team_coaches WHERE team.team_id = '${team_id}' AND team.team_id = team_coaches.team_id AND team_coaches.tr_id = '${tr_id}'`)
  await db.close()
  return coach
}

const getTournamentName = async (tr_id) =>{
  const db = await getDbConnection();
  const tr_name = await db.all(`SELECT * FROM tournament WHERE tr_id = '${tr_id}'`)
  await db.close()
  return tr_name
}
// const getMatch = async (match_no) => {};

const deleteTournament = async (tr_id) => {
  const db = await getDbConnection();
  const tournaments = await db.all(`DELETE FROM tournament 
  WHERE tr_id = '${tr_id}'`);

  await db.close();
  return tournaments;
};

const deleteTeam = async (team_id, tr_id) => {
  const db = await getDbConnection();
  const team = await db.all(`DELETE FROM team 
  WHERE team_id = '${team_id}' AND tr_id = '${tr_id}'`);
  await db.close();
  return team;
};

const deletePlayer = async (team_id, player_id) => {
  const db = await getDbConnection();
  const player = await db.all(`DELETE FROM player 
  WHERE player.team_id =' ${team_id}' AND player_id =' ${player_id}'`);
  await db.close();
  return player;
};

const deleteMatch = async (match_no) => {
  const db = await getDbConnection();
  const match = await db.all(`DELETE FROM match_played WHERE match_no = '${match_no}'`);
  await db.close();
  return match;
};

const addTournament = async (tournamentData) => {
  const db = await getDbConnection();

  const tournament = await db.run(`INSERT INTO tournament ('tr_id','tr_name','start_date','end_date')
  VALUES ('${tournamentData.tr_id}','${tournamentData.tr_name}',' ${tournamentData.start_date}','${tournamentData.end_date}')`);
  await db.close();
  return tournament;
};

const addTeam = async (teamData) => {
  const db = await getDbConnection();
  const team = await db.run(`INSERT INTO team 
  (team_id,tr_id,team_group,match_played,won,draw,lost,goal_for,goal_against,goal_diff,points,group_position)
  VALUES ('${teamData.team_id}','${teamData.tr_id}','${teamData.team_group}','
  ${teamData.match_played}','${teamData.won}','${teamData.draw}','${teamData.lost}',
  '${teamData.goal_for}','${teamData.goal_against}','${teamData.goal_diff}','${teamData.points}','${teamData.group_position}') `);
  await db.close();
  return team;
};

const addPlayer = async (playerData) => {
  const db = await getDbConnection();
  const player = await db.all(`INSERT INTO player 
  (player_id,team_id,jersey_no,player_name,position_to_play,dt_of_bir)
  VALUES ('${playerData.player_id}','${playerData.team_id}','
  ${playerData.jersey_no}','${playerData.player_name}',
  '${playerData.position_to_play}','${playerData.dt_of_bir}') `);
  await db.close();
  return player;
};

const addMatch = async (matchData) => {
  const db = await getDbConnection();
  const match =
    await db.all(`INSERT INTO match_played (match_no,play_stage,play_date,results,decided_by,goal_score,venue_id,referee_id,audience,player_of_match,stop1_sec,stop2_sec)
  VALUES ('${matchData.match_no}','${matchData.play_stage}','${matchData.play_date}','
  ${matchData.results},${matchData.decided_by},${matchData.goal_score},
  ${matchData.venue_id},${matchData.referee_id},${matchData.audience},
  ${matchData.player_of_match},${matchData.stop1_sec},${matchData.stop2_sec} `);
  await db.close();
  return match;
};

const addRefree = async (refereeData) => {
  const db = await getDbConnection();
  const referee = await db.all(`INSERT INTO referee (referee_id,referee_name)
  VALUES ('${refereeData.referee_id}','${refereeData.referee_name}')`);
  await db.close();
  return referee;
};

const addTeamCoach = async (coachData) => {
  const db = await getDbConnection();
  const coach = await db.all(`INSERT INTO team_coach (team_id,tr_id,coach_id)
  VALUES (${coachData.team_id},${coachData.tr_id},${coachData.coach_id})`);
  await db.close();
  return coach;
};

const editTournament = async (tr_id, tournamentData) => {
  const db = await getDbConnection();
  const tournament = await db.all(`UPDATE tournament
  SET (tr_id,tr_name,start_date,end_date)
  VALUES ('${tournamentData.tr_id}','${tournamentData.tr_name}','${tournamentData.start_date}','${tournamentData.end_date}) 
  WHERE tr_id = '${tr_id}'`);
  await db.close();
  return tournament;
};

const editTeam = async (team_id, teamData) => {
  const db = await getDbConnection();
  const team = await db.all(`UPDATE team
  SET team_id,tr_id,team_group,match_played,won,draw,lost,goal_for,goal_against)
  VALUES ('${teamData.team_id}','${teamData.tr_id}','${teamData.team_group}','${teamData.match_played},${teamData.won},${teamData.draw},${teamData.lost},${teamData.goal_for},${teamData.goal_against}  
  WHERE team_id = '${team_id}'`);
  await db.close();
  return team;
};

const editPlayer = async (player_id, playerData) => {
  const db = await getDbConnection();
  const player = await db.all(`UPDATE player
  SET (player_id,team_id,jersey_no,player_name,position_to_play,dt_of_bir)
  VALUES ('${playerData.player_id}','${playerData.team_id}','${playerData.jersey_no}','${playerData.player_name},${playerData.position_to_play},${playerData.dt_of_bir} 
  WHERE player_id = '${player_id}'`);
  await db.close();
  return player;
};

const editMatch = async (match_no, matchData) => {
  const db = await getDbConnection();
  const match = await db.all(`UPDATE tournament
  SET ((match_no,play_stage,play_date,results,decided_by,goal_score,venue_id,referee_id,audience,player_of_match,stop1_sec,stop2_sec)
  VALUES ('${matchData.match_no}','${matchData.play_stage}','${matchData.play_date}','
  ${matchData.results},${matchData.decided_by},${matchData.goal_score},
  ${matchData.venue_id},${matchData.referee_id},${matchData.audience},
  ${matchData.player_of_match},${matchData.stop1_sec},${matchData.stop2_sec} 
  WHERE match_no = '${match_no}'`);
  await db.close();
  return match;
};

module.exports = {
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
  getCoachName,
  getTournamentName,
  getTournamentsDetailsForDelete,
  getAllMatches,
};
