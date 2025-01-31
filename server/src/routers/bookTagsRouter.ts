import express from "express";
import bookTagsController from "@/controllers/bookTagsController";

export const router = express.Router();

router.get("/", bookTagsController.readTags);
