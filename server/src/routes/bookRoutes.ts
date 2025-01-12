import express, { Request, Response } from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../models/bookModel";

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 */
router.get("/books", (req: Request, res: Response) => {
  getBooks((err, rows) => {
    if (err) {
      res.status(500).json({ message: "Error retrieving books" });
    } else {
      res.status(200).json(rows);
    }
  });
});

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     description: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A book with the given ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 */
router.get("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  getBookById(Number(id), (err, row) => {
    if (err) {
      res.status(500).json({ message: "Error retrieving book" });
    } else if (!row) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json(row);
    }
  });
});

/**
 * @swagger
 * /api/books:
 *   post:
 *     description: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: The book has been created
 */
router.post("/books", (req: Request, res: Response) => {
  const { title, author } = req.body;
  createBook(title, author, (err) => {
    if (err) {
      res.status(500).json({ message: "Error creating book" });
    } else {
      res.status(201).json({ message: "Book created" });
    }
  });
});

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     description: Update a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: The book has been updated
 */
router.put("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author } = req.body;
  updateBook(Number(id), title, author, (err) => {
    if (err) {
      res.status(500).json({ message: "Error updating book" });
    } else {
      res.status(200).json({ message: "Book updated" });
    }
  });
});

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     description: Delete a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The book has been deleted
 */
router.delete("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  deleteBook(Number(id), (err) => {
    if (err) {
      res.status(500).json({ message: "Error deleting book" });
    } else {
      res.status(200).json({ message: "Book deleted" });
    }
  });
});

export default router;
