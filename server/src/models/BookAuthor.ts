import { BaseCRUD } from "./BaseCRUD";

export type IBookAuthor = {
  id: string;
  name: string;
};

export class BookAuthor {
  private static TABLE = "book_authors";

  static read = (id: string) => BaseCRUD.read<IBookAuthor>(this.TABLE, id);
}
