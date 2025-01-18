import express from "express";
import bookPublishersController from "@/controllers/bookPublishersController";

export const router = express.Router();

router.get("/", bookPublishersController.readPublishers);
