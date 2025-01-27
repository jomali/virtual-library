import { BookAuthor } from "@/models/BookAuthor";
import { Request, Response } from "express";

const readAuthors = async (req: Request, res: Response) => {
  try {
    const data = await BookAuthor.readAll();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export default { readAuthors };
