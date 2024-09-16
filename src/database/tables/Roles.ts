import { db } from '../db';

interface RoleData {
  id?: number;
  userId: number;
  role: string;
}

export const Role = {
  async createTable() {
    return (await db).transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS roles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER,
          role TEXT,
          FOREIGN KEY (userId) REFERENCES users (id)
        )`,
      );
    });
  },

  async insert(roleData: RoleData) {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'INSERT INTO roles (userId, role) VALUES (?, ?)',
          [roleData.userId, roleData.role],
          (_, results) => resolve(results),
          (_, error) => reject(error),
        );
      });
    });
  },

  async getById(id: number) {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM roles WHERE id = ?',
          [id],
          (_, result) => {
            const rows = result.rows.raw();
            resolve(rows.length > 0 ? rows[0] : null);
          },
          (_, error) => reject(error),
        );
      });
    });
  },

  async update(roleData: RoleData) {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'UPDATE roles SET userId = ?, role = ? WHERE id = ?',
          [roleData.userId, roleData.role, roleData.id],
          (_, results) => resolve(results),
          (_, error) => reject(error),
        );
      });
    });
  },

  async delete(id: number) {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'DELETE FROM roles WHERE id = ?',
          [id],
          (_, results) => resolve(results),
          (_, error) => reject(error),
        );
      });
    });
  },

  async getAll() {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM roles',
          [],
          (_, result) => {
            const rows = result.rows.raw();
            resolve(rows);
          },
          (_, error) => reject(error),
        );
      });
    });
  },
};
