export const bookKeyFactory = {
  all: () => ["all"],
  getBooks: () => [
    ...bookKeyFactory.all(), //
    "books",
  ],
  getBook: ({ bookId }: { bookId: string }) => [
    ...bookKeyFactory.all(), //
    "book",
    bookId,
  ],
  getBookDetails: () => [
    ...bookKeyFactory.all(), //
    "details",
  ],
  getBookAuthors: () => [
    ...bookKeyFactory.getBookDetails(), //
    "authors",
  ],
  getBookPublishers: () => [
    ...bookKeyFactory.getBookDetails(), //
    "publishers",
  ],
  createEditBook: () => [
    ...bookKeyFactory.all(), //
    "createEdit",
  ],
  deleteBook: ({ bookId }: { bookId: string }) => [
    ...bookKeyFactory.all(), //
    "delete",
    bookId,
  ],
};
