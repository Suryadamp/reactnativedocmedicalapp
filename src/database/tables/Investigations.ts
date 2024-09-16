import { db } from '../db'; // Make sure you have a db instance from your SQLite setup

export const Investigations = {
  // Create Investigations Table
  async createTable() {
    return (await db).transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS investigations (
          id INTEGER PRIMARY KEY NOT NULL,
          department TEXT,
          appointment_id INTEGER,
          invoice_no TEXT,
          created_at TEXT
        )`,
      );
    });
  },

  // Insert an Investigation
  async insert(investigation: {
    id: number;
    department: string;
    appointment_id: number;
    invoice_no: string;
    created_at: string;
  }) {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'INSERT INTO investigations (id, department, appointment_id, invoice_no, created_at) VALUES (?, ?, ?, ?, ?)',
          [
            investigation.id,
            investigation.department,
            investigation.appointment_id,
            investigation.invoice_no,
            investigation.created_at,
          ],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },

  // Get an Investigation by ID
  async getById(id: number) {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM investigations WHERE id = ?',
          [id],
          (_, result) => {
            const rows = result.rows.raw(); // Convert to array of objects
            resolve(rows.length > 0 ? rows[0] : null);
          },
          (_, error) => reject(error),
        );
      });
    });
  },

  // Update an Investigation
  async update(investigation: {
    id: number;
    department: string;
    appointment_id: number;
    invoice_no: string;
    created_at: string;
  }) {
    return (await db).transaction((tx) => {
      tx.executeSql(
        'UPDATE investigations SET department = ?, appointment_id = ?, invoice_no = ?, created_at = ? WHERE id = ?',
        [
          investigation.department,
          investigation.appointment_id,
          investigation.invoice_no,
          investigation.created_at,
          investigation.id,
        ],
      );
    });
  },

  // Delete an Investigation
  async delete(id: number) {
    return (await db).transaction((tx) => {
      tx.executeSql('DELETE FROM investigations WHERE id = ?', [id]);
    });
  },

  // Get All Investigations
  async getAll() {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM investigations',
          [],
          (_, result) => {
            const rows = result.rows.raw(); // Convert to array of objects
            resolve(rows);
          },
          (_, error) => reject(error),
        );
      });
    });
  },

  // Drop Investigations Table
  async dropTable() {
    return (await db).transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS investigations');
    });
  },
};
