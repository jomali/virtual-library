import { Database } from "./Database";
import { BaseCRUD } from "./BaseCRUD";
import { BookPublisher, BookPublisherDTO } from "./BookPublisher";
import { CamelizeKeys } from "@/utils/types";
import { BookAuthor, BookAuthorDB, BookAuthorDTO } from "./BookAuthor";

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
  authors: BookAuthorDTO[];
  id?: string;
  publisher: BookPublisherDTO;
  series?: object; // TODO
};

export class Books {
  public static table = "books";
  public static authorRelationsTable = "books_authors_relations";

  static checkPublisher = async (
    publisher: BookPublisherDTO | string
  ): Promise<BookPublisherDTO> => {
    if (typeof publisher === "string") {
      return await BookPublisher.create({ name: publisher });
    } else {
      return publisher;
    }
  };

  static checkSeries = () => null;

  static createBookAuthorsAndRelations = (
    bookId: string,
    authors: (BookAuthorDTO | string)[]
  ): Promise<BookAuthorDTO[]> => {
    const bookAuthorRelationSql = `
      INSERT INTO books_authors_relations
      (book_id, book_author_id)
      VALUES (?, ?)
    `;
    return Promise.all(
      authors.map(async (element) => {
        if (typeof element === "string") {
          const newAuthor = await BookAuthor.create({ name: element });
          await Database.run(bookAuthorRelationSql, [bookId, newAuthor.id]);
          return newAuthor;
        } else {
          await Database.run(bookAuthorRelationSql, [bookId, element.id]);
          return element;
        }
      })
    );
  };

  static create = async (data: BookDTO): Promise<BookDTO> => {
    try {
      const id = crypto.randomUUID();
      const publisher = await this.checkPublisher(data.publisher);

      await Database.run(
        `
        INSERT INTO ${this.table}
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

      // Author and book-author relation entities:
      const authors = await this.createBookAuthorsAndRelations(
        id,
        data.authors
      );

      return {
        id,
        authors,
        publisher,
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

  static read = async (id: string): Promise<BookDTO> => {
    try {
      const book = await Database.get<BookDB>(
        `
          SELECT ${this.table}.*
          FROM ${this.table}
          WHERE id = ?
        `,
        [id]
      );

      // Authors:
      const authors = await Database.all<BookAuthorDB>(
        `
          SELECT book_authors.*
          FROM books_authors_relations
          INNER JOIN books
            ON books.id = books_authors_relations.book_id
          INNER JOIN book_authors
            ON book_authors.id = books_authors_relations.book_author_id
          WHERE books.id = ?
        `,
        [book.id]
      );

      // Publisher:
      const publisher = await BookPublisher.read(book.publisher_id);

      return {
        authors,
        publisher,
        id: book.id,
        title: book.title,
        language: book.language,
        releaseDate: book.release_date,
        edition: book.edition,
        rating: book.rating,
      };
    } catch (error) {
      console.error(
        `[ERROR] Books.read: "${error instanceof Error ? error.message : String(error)}"`
      );
      throw error;
    }
  };

  static readAll = async (): Promise<BookDTO[]> => {
    try {
      const books = await Database.all<BookDB>(
        `
          SELECT ${this.table}.*
          FROM ${this.table}
        `
      );

      const result = books.map(async (element) => {
        // Authors:
        const authors = await Database.all<BookAuthorDB>(
          `
            SELECT book_authors.*
            FROM books_authors_relations
            INNER JOIN books
              ON books.id = books_authors_relations.book_id
            INNER JOIN book_authors
              ON book_authors.id = books_authors_relations.book_author_id
            WHERE books.id = ?
          `,
          [element.id]
        );

        // Publisher:
        const publisher = await BookPublisher.read(element.publisher_id);

        return {
          authors,
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

  static delete = (id: string) => BaseCRUD.delete(this.table, id);
  static deleteMultiple = (ids: string[]) =>
    BaseCRUD.deleteMultiple(this.table, ids);
}
