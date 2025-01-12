// src/server.ts
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import bookRoutes from "./routes/bookRoutes";
import swaggerDocument from "./swagger.json";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Set up Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api", bookRoutes);

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Book API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
