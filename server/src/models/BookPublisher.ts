import { BaseCRUD } from "./BaseCRUD";
import { Database } from "./Database";
import { CamelizeKeys } from "@/utils/types";

export type BookPublisherDB = {
  id: string;
  name: string;
};

export type BookPublisherDTO = Omit<CamelizeKeys<BookPublisherDB>, "id"> & {
  id?: string;
};

export class BookPublisher {
  public static TABLE = "book_publishers";

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
  static readAll = () => BaseCRUD.readAll<BookPublisherDB>(this.TABLE);
  static delete = (id: string) => BaseCRUD.delete(this.TABLE, id);
}
