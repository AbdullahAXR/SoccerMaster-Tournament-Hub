import { Database } from 'sqlite3'
import { open } from 'sqlite'

// open the database
const getDbConnection = async () => {
  return await open({
    filename: './sqlite.db3',
    driver: Database
  })
}
// query the database to return an array of sessions from the sessions table.
const getAllRequestedSessions = async (searchKeyword, subject, limit, offset) => {
  const db = await getDbConnection();
  let checksubj = ''
  if (subject)
    checksubj = `
   AND EXISTS(
    SELECT * FROM SUBJECT subj JOIN SESSION_SUBJECT ses_subj ON subj.id = ses_subj.subject_id
    WHERE ses_subj.request_session_id = ses.id AND subj.name = '${subject}'
  ) 
  `
  const sessions = await db.all(`
  SELECT * FROM REQUEST_SESSION ses WHERE title LIKE '%${searchKeyword}%' ${checksubj} ORDER BY 'startDate' DESC LIMIT ${limit} OFFSET ${offset}
  `)
  await db.close()
  return sessions
}