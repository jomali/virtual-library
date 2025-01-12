/* eslint-disable @typescript-eslint/no-explicit-any */
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./books.db"); // Create or open SQLite database file

// Create the books table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL
    )
  `);
});

export const getBooks = (
  callback: (err: Error | null, rows: any[]) => void
) => {
  db.all("SELECT * FROM books", [], callback);
};

export const getBookById = (
  id: number,
  callback: (err: Error | null, row: any) => void
) => {
  db.get("SELECT * FROM books WHERE id = ?", [id], callback);
};

export const createBook = (
  title: string,
  author: string,
  callback: (err: Error | null) => void
) => {
  db.run(
    "INSERT INTO books (title, author) VALUES (?, ?)",
    [title, author],
    callback
  );
};

export const updateBook = (
  id: number,
  title: string,
  author: string,
  callback: (err: Error | null) => void
) => {
  db.run(
    "UPDATE books SET title = ?, author = ? WHERE id = ?",
    [title, author, id],
    callback
  );
};

export const deleteBook = (
  id: number,
  callback: (err: Error | null) => void
) => {
  db.run("DELETE FROM books WHERE id = ?", [id], callback);
};
