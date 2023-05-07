



const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sqlite.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("Getting error " + err.message);
    }
    else {
        console.log("Connected to the SQLite database.");
    }
});

// if (typeof document !== 'undefined') {
//     const tbody = document.getElementById('Manage-teams');

//     const tr = document.createElement('tr');
//     tbody.appendChild(tr);
//     console.log(tr)
//     console.log(tbody)
// }
db.serialize(() => {
    db.each('SELECT * FROM team', (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row+"\t"+row.team_id + "\t" + row.team_group);
    });
  });

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});
// const sql = 'SELECT * FROM team'
// db.all(sql, [], (err, rows) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     rows.forEach((row) => {
//         if (typeof document !== 'undefined') {
            // const th = document.createElement('th');
            // th.setAttribute('scope', 'row');
            // th.innerHTML = row.tr_id;
            // tr.appendChild(th);
            // const td_team_id = document.createElement('td');
            // td_team_id.innerHTML = row.team_id;
            // tr.appendChild(td_team_id);
//         }
//     });
// });