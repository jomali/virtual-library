import cors from "cors";
import express from "express";
import "dotenv/config";

import { router } from "@/routers/router";
import { router as booksRouter } from "@/routers/booksRouter";

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Server is running!"));

app.use("/api", router);
app.use("/api/books", booksRouter);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
