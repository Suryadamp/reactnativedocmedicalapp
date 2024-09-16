import { db } from '../db'; // Make sure to import your actual db instance

export const SubTests = {
  // Create the SubTests Table
  async createTable() {
    (await db).transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS SubTests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          labReportItemId INTEGER,
          test_name TEXT,
          ref_range TEXT,
          reading_value TEXT,
          sample_date TEXT,
          result_type TEXT,
          result_level TEXT,
          FOREIGN KEY (labReportItemId) REFERENCES LabReportItems (id)
        )`,
      );
    });
  },

  // Insert a SubTest
  async insert(subTest) {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'INSERT INTO SubTests (labReportItemId, test_name, ref_range, reading_value, sample_date, result_type, result_level) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            subTest.labReportItemId,
            subTest.test_name,
            subTest.ref_range,
            subTest.reading_value,
            subTest.sample_date,
            subTest.result_type,
            subTest.result_level,
          ],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },

  // Get SubTests by labReportItemId
  async getByLabReportItemId(labReportItemId) {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM SubTests WHERE labReportItemId = ?',
          [labReportItemId],
          (_, { rows: { _array } }) => resolve(_array),
          (_, error) => reject(error),
        );
      });
    });
  },

  // Update a SubTest
  async update(id, subTest) {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'UPDATE SubTests SET test_name = ?, ref_range = ?, reading_value = ?, sample_date = ?, result_type = ?, result_level = ? WHERE id = ?',
          [
            subTest.test_name,
            subTest.ref_range,
            subTest.reading_value,
            subTest.sample_date,
            subTest.result_type,
            subTest.result_level,
            id,
          ],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },

  // Delete a SubTest
  async delete(id) {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'DELETE FROM SubTests WHERE id = ?',
          [id],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },

  // Drop the SubTests Table (Optional: for testing/cleanup purposes)
  async dropTable() {
    (await db).transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS SubTests');
    });
  },
};
