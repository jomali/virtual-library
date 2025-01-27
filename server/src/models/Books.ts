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

  private static checkPublisher = async (
    publisher: BookPublisherDTO
  ): Promise<BookPublisherDTO> => {
    if (publisher.id) {
      return publisher;
    } else {
      return await BookPublisher.create(publisher);
    }
  };

  private static checkSeries = () => null;

  private static createBookAuthorsAndRelations = (
    bookId: string,
    authors: BookAuthorDTO[]
  ): Promise<BookAuthorDTO[]> => {
    const bookAuthorRelationSql = `
      INSERT INTO books_authors_relations
      (book_id, book_author_id)
      VALUES (?, ?)
    `;
    return Promise.all(
      authors.map(async (element) => {
        if (element.id) {
          await Database.run(bookAuthorRelationSql, [bookId, element.id]);
          return element;
        } else {
          const newAuthor = await BookAuthor.create(element);
          await Database.run(bookAuthorRelationSql, [bookId, newAuthor.id]);
          return newAuthor;
        }
      })
    );
  };

  private static removeDetachedAuthors = async (bookId: string) => {
    const authors = await Database.all<{ id: string }>(
      `
        SELECT books_authors_relations.book_author_id AS id
        FROM books_authors_relations
        WHERE books_authors_relations.book_author_id IN (
          SELECT books_authors_relations.book_author_id
          FROM books_authors_relations
          WHERE books_authors_relations.book_id = ?
        );
      `,
      [bookId]
    );

    await Database.run(
      `
        DELETE FROM books_authors_relations
        WHERE books_authors_relations.book_id = ?;
      `,
      [bookId]
    );

    if (authors.length === 1 && authors[0]?.id) {
      await BookAuthor.delete(authors[0].id);
    }
  };

  private static removeDetachedPublishers = async (publisherId: string) => {
    const publishers = await Database.all<{ id: string }>(
      `
        SELECT books.publisher_id AS id
        FROM books
        WHERE books.publisher_id = ?;
      `,
      [publisherId]
    );

    if (!publishers.length) {
      await BookPublisher.delete(publisherId);
    }
  };

  public static create = async (data: BookDTO): Promise<BookDTO> => {
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

  public static read = async (id: string): Promise<BookDTO> => {
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

  public static readAll = async (): Promise<BookDTO[]> => {
    try {
      const books = await BaseCRUD.readAll<BookDB>(this.table);

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

  public static delete = async (id: string) => {
    try {
      const book = await BaseCRUD.read<BookDB>(this.table, id);
      console.log(`🔔 book`, book);

      await this.removeDetachedAuthors(id);

      const result = await BaseCRUD.delete(this.table, id);

      await this.removeDetachedPublishers(book.publisher_id);

      console.log(`[SUCCESS] Books.delete: Deleted "${id}`);
      return result;
    } catch (error) {
      console.error(
        `[ERROR] Books.delete: "${error instanceof Error ? error.message : String(error)}"`
      );
      throw new Error("Unavailable service.");
    }
  };

  public static deleteMultiple = (ids: string[]) =>
    BaseCRUD.deleteMultiple(this.table, ids);
}
