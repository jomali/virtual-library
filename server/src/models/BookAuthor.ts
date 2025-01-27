import { BaseCRUD } from "./BaseCRUD";
import { Database } from "./Database";
import { CamelizeKeys } from "@/utils/types";

export type BookAuthorDB = {
  id: string;
  name: string;
};

export type BookAuthorDTO = Omit<CamelizeKeys<BookAuthorDB>, "id"> & {
  id?: string;
};

export class BookAuthor {
  public static TABLE = "book_authors";

  static create = async (
    data: Omit<BookAuthorDB, "id">
  ): Promise<BookAuthorDB> => {
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

  static read = (id: string) => BaseCRUD.read<BookAuthorDB>(this.TABLE, id);
  static readAll = () => BaseCRUD.readAll<BookAuthorDB>(this.TABLE);
  static delete = (id: string) => BaseCRUD.delete(this.TABLE, id);
}
