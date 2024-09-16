import { db } from '../db'; // Ensure you have this db instance correctly set up

interface Department {
  id: number;
  dept_name: string;
}

export const Departments = {
  // Create the Departments Table
  async createTable() {
    return (await db).transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS departments (
          id INTEGER PRIMARY KEY,
          dept_name TEXT
        )`,
      );
    });
  },

  // Insert a new department
  async insert(department: Department) {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'INSERT INTO departments (id, dept_name) VALUES (?, ?)',
          [department.id, department.dept_name],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },

  // Retrieve a department by ID
  async getById(id: number): Promise<Department[]> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM departments WHERE id = ?',
          [id],
          (_, { rows }) => {
            let departments: Department[] = [];
            for (let i = 0; i < rows.length; i++) {
              departments.push(rows.item(i));
            }
            resolve(departments);
          },
          (_, error) => reject(error),
        );
      });
    });
  },

  // Update a department's details
  async update(department: Department): Promise<void> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE departments SET dept_name = ? WHERE id = ?',
          [department.dept_name, department.id],
          () => resolve(),
          (_, error) => reject(error),
        );
      });
    });
  },

  // Delete a department
  async delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM departments WHERE id = ?',
          [id],
          () => resolve(),
          (_, error) => reject(error),
        );
      });
    });
  },

  // Optional: List all departments
  async listAll(): Promise<Department[]> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM departments',
          [],
          (_, { rows }) => {
            let departments: Department[] = [];
            for (let i = 0; i < rows.length; i++) {
              departments.push(rows.item(i));
            }
            resolve(departments);
          },
          (_, error) => reject(error),
        );
      });
    });
  },
};
