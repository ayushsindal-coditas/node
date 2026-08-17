import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import { ApiResponse } from "./utils/ApiResponse";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json(ApiResponse.success({ status: "ok" }, "Server is healthy"));
});

app.use("/api", routes);

// Anything that didn't match a route above falls through to this, then to errorHandler.
app.use(notFound);
app.use(errorHandler);

export default app;
