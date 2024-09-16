import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(false);
SQLite.enablePromise(true);

const databaseParams = {
  name: 'HmsDatabase.db',
  location: 'default',
};

export const db = SQLite.openDatabase(
  databaseParams,
  () => { },
  (error) => {
    console.error(error);
  },
);

export const closeDatabase = () => {
  if (db) {
    db.close()
      .then((status) => {
        console.log('Database CLOSED', status);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log('Database was not OPENED');
  }
};

export const isTableExist = (tableName: string, callback: Function) => {
  const query = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`;
  db.executeSql(query, [], (err, row) => {
    if (err) {
      console.error('Error checking if table exists:', err);
      callback(false);
    } else {
      callback(!!row); // Return true if row exists (table exists), otherwise false
    }
  });
}
