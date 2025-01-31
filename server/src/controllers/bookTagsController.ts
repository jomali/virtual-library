import { BookTag } from "@/models/BookTag";
import { Request, Response } from "express";

const readTags = async (req: Request, res: Response) => {
  try {
    const data = await BookTag.readAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export default { readTags };
