import { Database } from "./Database";

export class BaseCRUD {
  /**
   * Deletes the element with the given `id`.
   */
  static delete = async (table: string, id: string) => {
    const result = await Database.run(
      `
        DELETE FROM ${table}
        WHERE id = ?
      `,
      [id]
    );
    return result;
  };

  /**
   * Deletes the elements with the given `ids`.
   */
  static deleteMultiple = async (table: string, ids: string[]) => {
    const result = await Database.run(
      `
        DELETE FROM ${table}
        WHERE id IN (${ids.join(", ")})
      `
    );
    return result;
  };

  /**
   * Reads the element with the given `id`.
   */
  static async read<T>(table: string, id: string): Promise<T> {
    const result = await Database.get<T>(
      `
        SELECT ${table}.*
        FROM ${table}
        WHERE id = $id
      `,
      {
        $id: id,
      }
    );

    return result;
  }

  /**
   * Reads all the elements.
   */
  static async readAll<T>(table: string): Promise<T[]> {
    const result = await Database.all<T>(
      `
        SELECT ${table}.*
        FROM ${table}
      `
    );
    return result;
  }
}
