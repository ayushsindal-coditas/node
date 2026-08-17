import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

/**
 * Registered after all routes. Anything that reaches here matched no route,
 * so it's turned into a 404 and handed to the centralized errorHandler.
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};
