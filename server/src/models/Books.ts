import { Database } from "./Database";
import { BaseCRUD } from "./BaseCRUD";
import { BookPublisher, BookPublisherDTO } from "./BookPublisher";
import { CamelizeKeys } from "@/utils/types";
import { BookAuthor, BookAuthorDB, BookAuthorDTO } from "./BookAuthor";
import { BookSeries, BookSeriesDTO } from "./BookSeries";
import { BookTag, BookTagDTO } from "./BookTag";

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
  series?: BookSeriesDTO;
  tags?: BookTagDTO[];
};

export class Books {
  public static table = "books";
  public static authorRelationsTable = "books_authors_relations";

  private static checkPublisher = async (
    publisher: BookPublisherDTO
  ): Promise<BookPublisherDTO> =>
    publisher.id ? publisher : await BookPublisher.create(publisher);

  private static checkSeries = async (
    series?: BookSeriesDTO
  ): Promise<BookSeriesDTO | { id?: string }> => {
    if (!series) {
      return {};
    } else if (series.id) {
      return series;
    } else {
      return await BookSeries.create(series);
    }
  };

  private static createBooksAuthorsRelations = (
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

  private static createBooksTagsRelations = (
    bookId: string,
    tags: BookTagDTO[] = []
  ): Promise<BookTagDTO[]> => {
    const booksTagsRelationSql = `
      INSERT INTO books_tags_relations
      (book_id, book_tag_id)
      VALUES (?, ?)
    `;
    return Promise.all(
      tags
        .filter((element) => Boolean(element))
        .map(async (element) => {
          if (element.id) {
            await Database.run(booksTagsRelationSql, [bookId, element.id]);
            return element;
          } else {
            const newTag = await BookTag.create(element);
            await Database.run(booksTagsRelationSql, [bookId, newTag.id]);
            return newTag;
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

  private static removeDetachedTags = async (bookId: string) => {
    const tags = await Database.all<{ id: string }>(
      `
        SELECT books_tags_relations.book_tag_id AS id
        FROM books_tags_relations
        WHERE books_tags_relations.book_tag_id IN (
          SELECT books_tags_relations.book_tag_id
          FROM books_tags_relations
          WHERE books_tags_relations.book_id = ?
        );
      `,
      [bookId]
    );

    await Database.run(
      `
        DELETE FROM books_tags_relations
        WHERE books_tags_relations.book_id = ?;
      `,
      [bookId]
    );

    if (tags.length === 1 && tags[0]?.id) {
      await BookTag.delete(tags[0].id);
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

  private static removeDetachedSeries = async (seriesId?: string) => {
    if (seriesId) {
      const series = await Database.all<{ id: string }>(
        `
          SELECT books.series_id AS id
          FROM books
          WHERE books.series_id = ?;
        `,
        [seriesId]
      );

      if (!series.length) {
        await BookSeries.delete(seriesId);
      }
    }
  };

  public static create = async (data: BookDTO): Promise<BookDTO> => {
    try {
      const id = crypto.randomUUID();
      const publisher = await this.checkPublisher(data.publisher);
      const series = await this.checkSeries(data.series);

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
          series.id,
          data.seriesNumber,
          data.language,
          publisher.id,
          data.edition,
          data.releaseDate,
          data.originalTitle,
          data.rating,
        ]
      );

      // Author and book-author relation entities:
      const authors = await this.createBooksAuthorsRelations(id, data.authors);

      // Tags and book-tag relation entities:
      const tags = await this.createBooksTagsRelations(id, data.tags);

      return {
        id,
        authors,
        publisher,
        // series,
        tags,
        edition: data.edition,
        language: data.language,
        originalTitle: data.originalTitle,
        rating: data.rating,
        releaseDate: data.releaseDate,
        seriesNumber: data.seriesNumber,
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

      // Series:
      const series = await BookSeries.read(book.series_id);

      return {
        authors,
        publisher,
        series,
        edition: book.edition,
        id: book.id,
        language: book.language,
        rating: book.rating,
        releaseDate: book.release_date,
        seriesNumber: book.series_number,
        title: book.title,
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

        // Series
        const series = await BookSeries.read(element.series_id);

        return {
          authors,
          publisher,
          series,
          edition: element.edition,
          id: element.id,
          language: element.language,
          rating: element.rating,
          releaseDate: element.release_date,
          seriesNumber: element.series_number,
          title: element.title,
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

  public static update = async (id: string, data: BookDTO) => {
    try {
      // Book entity
      await Database.run(
        `
          UPDATE ${this.table}
          SET
            edition = COALESCE(?, edition),
            language = COALESCE(?, language),
            original_title = COALESCE(?, original_title),
            rating = COALESCE(?, rating),
            release_date = COALESCE(?, release_date),
            series_number = COALESCE(?, series_number),
            title = COALESCE(?, title)
          WHERE id = ?;
        `,
        [
          data.edition,
          data.language,
          data.originalTitle,
          data.rating,
          data.releaseDate,
          data.seriesNumber,
          data.title,
          id,
        ]
      );
    } catch (error) {
      console.error(
        `[ERROR] Books.update: "${error instanceof Error ? error.message : String(error)}"`
      );
      throw new Error("Unavailable service.");
    }
  };

  public static delete = async (id: string) => {
    try {
      const book = await BaseCRUD.read<BookDB>(this.table, id);

      await this.removeDetachedAuthors(id);
      await this.removeDetachedTags(id);

      const result = await BaseCRUD.delete(this.table, id);

      await this.removeDetachedPublishers(book.publisher_id);
      await this.removeDetachedSeries(book.series_id);

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
