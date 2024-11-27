import SQLite from 'react-native-sqlite-storage';

export const db = SQLite.openDatabase(
  { name: 'Subscription.db', location: 'default' },
  () => {
    
    db.executeSql('PRAGMA foreign_keys = ON;', [], 
    );
  },
  error => console.error('Error opening database: ', error),
);

export const createTables = () => {
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL
      );`,
      [],
      () => {
        txn.executeSql(
          'SELECT COUNT(*) as count FROM plans',
          [],
          (txn, results) => {
            const count = results.rows.item(0).count;
            if (count === 0) {
              txn.executeSql('INSERT INTO plans (name, price) VALUES (?, ?)', ['Monthly', 9.99]);
              txn.executeSql('INSERT INTO plans (name, price) VALUES (?, ?)', ['Annual', 99.99]);
            }
          },
        );
      },
      error => console.error('Error creating plans table: ', error),
    );

    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uid TEXT UNIQUE,  
        email TEXT,
        name TEXT,
        subscribed_plan_id INTEGER,
        FOREIGN KEY(subscribed_plan_id) REFERENCES plans(id)
      );`,
      [],
      
    );

    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS watchlist (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         user_id INTEGER,
         contentId INTEGER,
         title TEXT,
         videoUri TEXT,
         thumbnailUrl TEXT,
         description TEXT, 
         FOREIGN KEY(user_id) REFERENCES users(id)
         UNIQUE(user_id, contentId)
      );`,
      [],
      
    );
  });
};
