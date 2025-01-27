import { BookPublisher } from "@/models/BookPublisher";
import { Request, Response } from "express";

const readPublishers = async (req: Request, res: Response) => {
  try {
    const data = await BookPublisher.readAll();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export default { readPublishers };
