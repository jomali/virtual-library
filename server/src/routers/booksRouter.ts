import express from "express";
import booksController from "@/controllers/booksController";

export const router = express.Router();

router.delete("/:id", booksController.deleteBook);
router.get("/:id", booksController.readBook);
router.get("/", booksController.readBooks);
router.post("/", booksController.createBook);
router.put("/:id", booksController.updateBook);
