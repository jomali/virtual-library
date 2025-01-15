import { BaseCRUD } from "./BaseCRUD";
import { Database } from "./Database";

export type BookPublisherDB = {
  id: string;
  name: string;
};

export class BookPublisher {
  private static TABLE = "book_publishers";

  /**
   * Creates a new `BookPublisher`.
   */
  static create = async (
    data: Omit<BookPublisherDB, "id">
  ): Promise<BookPublisherDB> => {
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

  static read = (id: string) => BaseCRUD.read<BookPublisherDB>(this.TABLE, id);
}
