import sqlite3, { Database as DatabaseType } from "sqlite3";
import fs from "node:fs";

export class Database {
  private static db: DatabaseType;
  private static source: string = "./virtual-library.db";

  static {
    this.db = new sqlite3.Database(this.source, (connectionError) => {
      try {
        if (connectionError) {
          throw connectionError;
        } else {
          const databaseInitialization = fs.readFileSync(
            `./src/models/sql/initializations.sql`,
            { encoding: "utf-8" }
          );

          this.db.exec(databaseInitialization);
          console.log(`Successful connection to the database '${this.source}'`);
        }
      } catch (error) {
        console.error(error instanceof Error ? error.message : String(error));
      }
    });
  }

  /**
   * Reads a set of rows.
   */
  static all<T>(
    sql: string,
    params: Record<string, string | number | boolean | undefined> = {}
  ): Promise<T[]> {
    return new Promise((resolve, rejects) => {
      this.db.all(sql, params, function (error, rows: T[]) {
        if (error) {
          rejects(error);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * Closes the current database connection.
   */
  static close = () => {
    return new Promise((resolve) => {
      this.db.close();
      resolve(true);
    });
  };

  /**
   * Reads the first row.
   */
  static get<T>(
    sql: string,
    params: Record<string, string | number | boolean | undefined> = {}
  ): Promise<T> {
    return new Promise((resolve, rejects) => {
      this.db.get(sql, params, function (error, row: T) {
        if (error) {
          rejects(error);
        } else {
          resolve(row);
        }
      });
    });
  }

  /**
   * Runs the queries `insert`, `delete` and `update`.
   *
   * Note that the `db.run` callback parameter is not written as an arrow
   * function because arrow functions don't have their own `this` or
   * `arguments` bindings.
   */
  static run = (sql: string, params: unknown[] = []) => {
    return new Promise((resolve, rejects) => {
      this.db.run(sql, params, function (error) {
        if (error) {
          rejects(error);
        } else {
          resolve(this);
        }
      });
    });
  };
}
