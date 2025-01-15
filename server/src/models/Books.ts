import { Database } from "./Database";
import { BaseCRUD } from "./BaseCRUD";
import { BookPublisher, BookPublisherDB } from "./BookPublisher";
import { IBookAuthor } from "./BookAuthor";
import { CamelizeKeys } from "@/utils/types";

export type BookDB = {
  edition?: number;
  id: string;
  language: string;
  originalTitle?: string;
  publisher_id: string;
  rating?: number;
  release_date: string;
  series_id?: string;
  series_number?: number;
  title: string;
};

export type BookDTO = Omit<
  CamelizeKeys<BookDB>,
  "id" | "publisherId" | "seriesId"
> & {
  authors: IBookAuthor[];
  id?: string;
  publisher: BookPublisherDB;
  series?: object; // TODO
};

export class Books {
  private static TABLE = "books";

  static checkPublisher = async (
    publisher: BookPublisherDB | string
  ): Promise<BookPublisherDB> => {
    if (typeof publisher === "string") {
      return await BookPublisher.create({ name: publisher });
    } else {
      return publisher;
    }
  };

  static checkSeries = () => null;

  /**
   * Creates a new `Book`.
   */
  static create = async (data: BookDTO): Promise<BookDTO> => {
    try {
      const id = crypto.randomUUID();
      const publisher = await this.checkPublisher(data.publisher);

      await Database.run(
        `
        INSERT INTO ${this.TABLE}
        (
          id,
          title,
          series_id,
          series_number,
          language,
          publisher_id,
          edition,
          release_date,
          original_title,
          rating
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
        [
          id,
          data.title,
          undefined,
          undefined,
          data.language,
          publisher.id,
          data.edition,
          data.releaseDate,
          data.originalTitle,
          data.rating,
        ]
      );

      return {
        id,
        publisher,
        authors: [],
        edition: data.edition,
        language: data.language,
        originalTitle: data.originalTitle,
        rating: data.rating,
        releaseDate: data.releaseDate,
        title: data.title,
      };
    } catch (error) {
      console.error(
        `[ERROR] Books.create: "${error instanceof Error ? error.message : String(error)}"`
      );
      throw new Error("Unavailable service.");
    }
  };

  // static read = async (id: string): Promise<IBookDTO> => {
  //   try {
  //     const book = await Database.get<IBook>(
  //       `
  //         SELECT ${this.TABLE}.*
  //         FROM ${this.TABLE}
  //         WHERE id = $id
  //       `,
  //       {
  //         $id: id,
  //       }
  //     );

  //     const language = await BookLanguages.read(book.language_id);

  //     return {
  //       language,
  //       id: book.id,
  //       rating: book.rating,
  //       title: book.title,
  //     };
  //   } catch (error) {
  //     console.error(
  //       `[ERROR] Books.read: "${error instanceof Error ? error.message : String(error)}"`
  //     );
  //     throw error;
  //   }
  // };

  static readAll = async (): Promise<BookDTO[]> => {
    try {
      const books = await Database.all<BookDB>(
        `
          SELECT ${this.TABLE}.*
          FROM ${this.TABLE}
        `
      );

      const result = books.map(async (element) => {
        const publisher = await BookPublisher.read(element.publisher_id);

        return {
          authors: [],
          publisher,
          id: element.id,
          title: element.title,
          language: element.language,
          releaseDate: element.release_date,
          edition: element.edition,
          rating: element.rating,
        };
      });

      return Promise.all(result);
    } catch (error) {
      console.error(
        `[ERROR] Books.readAll: "${error instanceof Error ? error.message : String(error)}"`
      );
      throw new Error("Unavailable service.");
    }
  };

  static delete = (id: string) => BaseCRUD.delete(this.TABLE, id);
  static deleteMultiple = (ids: string[]) =>
    BaseCRUD.deleteMultiple(this.TABLE, ids);
}
