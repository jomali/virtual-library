import { BookSeries } from "@/models/BookSeries";
import { Request, Response } from "express";

const readSeries = async (req: Request, res: Response) => {
  try {
    const data = await BookSeries.readAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export default { readSeries };
