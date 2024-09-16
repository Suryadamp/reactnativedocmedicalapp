import { db } from '../db'; // Assuming you have a db instance set up

export const InvestigationProducts = {
  // Create InvestigationProducts Table
  async createTable() {
    return (await db).transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS investigation_products (
          id INTEGER PRIMARY KEY NOT NULL,
          investigation_id INTEGER,
          billing_items_master_id INTEGER,
          created_at TEXT,
          updated_at TEXT,
          deleted_at TEXT,
          created_by INTEGER,
          updated_by INTEGER,
          deleted_by INTEGER,
          FOREIGN KEY (investigation_id) REFERENCES investigations (id)
        )`,
      );
    });
  },

  // Insert Investigation Product
  async insert(investigationProduct: {
    investigation_id: number;
    billing_items_master_id: number;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
    created_by: number;
    updated_by: number | null;
    deleted_by: number | null;
  }) {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'INSERT INTO investigation_products (investigation_id, billing_items_master_id, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [
            investigationProduct.investigation_id,
            investigationProduct.billing_items_master_id,
            investigationProduct.created_at,
            investigationProduct.updated_at,
            investigationProduct.deleted_at,
            investigationProduct.created_by,
            investigationProduct.updated_by,
            investigationProduct.deleted_by,
          ],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },

  // Get Investigation Product by ID
  async getById(id: number) {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM investigation_products WHERE id = ?',
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

  // Update Investigation Product
  async update(
    id: number,
    updates: {
      billing_items_master_id?: number;
      updated_at?: string | null;
      deleted_at?: string | null;
      updated_by?: number | null;
      deleted_by?: number | null;
    },
  ) {
    return (await db).transaction((tx) => {
      tx.executeSql(
        'UPDATE investigation_products SET billing_items_master_id = ?, updated_at = ?, deleted_at = ?, updated_by = ?, deleted_by = ? WHERE id = ?',
        [
          updates.billing_items_master_id,
          updates.updated_at,
          updates.deleted_at,
          updates.updated_by,
          updates.deleted_by,
          id,
        ],
      );
    });
  },

  // Delete Investigation Product
  async delete(id: number) {
    return (await db).transaction((tx) => {
      tx.executeSql('DELETE FROM investigation_products WHERE id = ?', [id]);
    });
  },
};
