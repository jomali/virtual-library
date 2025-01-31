import cors from "cors";
import express from "express";
import "dotenv/config";

import { router as bookAuthorsRouter } from "@/routers/bookAuthorsRouter";
import { router as bookPublishersRouter } from "@/routers/bookPublishersRouter";
import { router as bookSeriesRouter } from "@/routers/bookSeriesRouter";
import { router as bookTagsRouter } from "@/routers/bookTagsRouter";
import { router as booksRouter } from "@/routers/booksRouter";

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Server is running!"));

app.use("/api/books/authors", bookAuthorsRouter);
app.use("/api/books/publishers", bookPublishersRouter);
app.use("/api/books/series", bookSeriesRouter);
app.use("/api/books/tags", bookTagsRouter);
app.use("/api/books", booksRouter);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
