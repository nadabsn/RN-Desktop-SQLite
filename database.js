import SQLite from 'react-native-sqlite-storage';

const DB_NAME = 'app.db';

const db = SQLite.openDatabase({name: DB_NAME, location: 'default'});

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Users 
       (id INTEGER PRIMARY KEY AUTOINCREMENT, 
        email TEXT, 
        password TEXT)`,
    );
  });
};

export const insertUser = (email, password) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO Users (email, password) VALUES (?, ?)', [
      email,
      password,
    ]);
  });
};

export const getAllUsers = () => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM Users', [], (_, results) => {
      const rows = results.rows;
      const len = rows.length;
      //   console.log('********* result get users*************');
      //   for (let i = 0; i < len; i++) {
      //     console.log(rows.item(i));
      //   }
    });
  });
};
export const truncateUsers = () => {
  return new Promise(resolve => {
    db.transaction(tx => {
      try {
        tx.executeSql('DELETE FROM Users', [], (_, results) => {
          console.log('********* users deleted *************');
          resolve();
        });
      } catch (error) {
        console.log('error', error);
      }
    });
  });
};

export const findUser = (email, password, callback) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Users WHERE email = ? AND password = ?`,
        [email, password],
        (_, result) => {
          callback(result.rows.length > 0);
          console.log('result', result.rows.length);
          for (let i = 0; i < len; i++) {
            console.log(result.rows.item(i));
          }
        },
      );
    });
  });
};
