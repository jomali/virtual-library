import { Books } from "@/models/Books";
import { Request, Response } from "express";

const createBook = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = await Books.create(body);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

const readBook = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    const data = await Books.read(id);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

const readBooks = async (req: Request, res: Response) => {
  try {
    const data = await Books.readAll();

    res.status(200).json({
      data,
      message: "Success",
    });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// TODO
const updateBook = async (req: Request, res: Response) => {
  res.json({
    message: "TODO: updateBook",
  });
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    const data = await Books.delete(id);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export default { createBook, readBook, readBooks, updateBook, deleteBook };
