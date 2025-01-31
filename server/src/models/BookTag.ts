import { CamelizeKeys } from "@/utils/types";
import { BaseCRUD } from "./BaseCRUD";
import { Database } from "./Database";

export type BookTagDB = {
  id: string;
  name: string;
};

export type BookTagDTO = Omit<CamelizeKeys<BookTagDB>, "id"> & {
  id?: string;
};

export class BookTag {
  public static TABLE = "book_tags";

  static create = async (data: Omit<BookTagDTO, "id">): Promise<BookTagDB> => {
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

  static read = (id?: string) =>
    id ? BaseCRUD.read<BookTagDB>(this.TABLE, id) : undefined;

  static readAll = () => BaseCRUD.readAll<BookTagDB>(this.TABLE);
  static delete = (id: string) => BaseCRUD.delete(this.TABLE, id);
}
