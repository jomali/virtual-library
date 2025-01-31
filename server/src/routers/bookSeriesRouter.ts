import express from "express";
import bookSeriesController from "@/controllers/bookSeriesController";

export const router = express.Router();

router.get("/", bookSeriesController.readSeries);
