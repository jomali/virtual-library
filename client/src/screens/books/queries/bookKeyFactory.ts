export const bookKeyFactory = {
  all: () => ["books"],
  getBooks: () => bookKeyFactory.all(),
  getBook: ({ bookId }: { bookId: string }) => [
    ...bookKeyFactory.all(), //
    bookId,
  ],
  createBook: () => [
    ...bookKeyFactory.all(), //
    "create",
  ],
  editBook: ({ bookId }: { bookId: string }) => [
    ...bookKeyFactory.all(), //
    "edit",
    bookId,
  ],
  deleteBook: ({ bookId }: { bookId: string }) => [
    ...bookKeyFactory.all(), //
    "delete",
    bookId,
  ],
};
