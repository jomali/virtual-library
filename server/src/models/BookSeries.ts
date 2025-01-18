import { BaseCRUD } from "./BaseCRUD";
import { Database } from "./Database";

export type BookSeriesDB = {
  id: string;
  name: string;
};

export class BookSeries {
  private static TABLE = "book_series";

  static create = async (
    data: Omit<BookSeriesDB, "id">
  ): Promise<BookSeriesDB> => {
    const id = crypto.randomUUID();
    await Database.run(
      `
        INSERT INTO ${this.TABLE}
        (id, name)
        VALUES (?, ?)
      `,
      [id, data.name]
    );

    return {
      id,
      name: data.name,
    };
  };

  static read = (id: string) => BaseCRUD.read<BookSeriesDB>(this.TABLE, id);
  static readAll = () => BaseCRUD.readAll<BookSeriesDB>(this.TABLE);
}
