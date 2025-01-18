import express from "express";
import bookAuthorsController from "@/controllers/bookAuthorsController";

export const router = express.Router();

router.get("/", bookAuthorsController.readAuthors);
