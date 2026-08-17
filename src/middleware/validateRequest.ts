import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError";

/**
 * Runs after an express-validator rule chain on a route. Collects any rule
 * failures and turns them into one ApiError so they flow through the same
 * centralized errorHandler as every other error in the app.
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const errors = result.array().map((error) => ({
    field: error.type === "field" ? error.path : "unknown",
    message: error.msg,
  }));

  next(new ApiError(422, "Validation failed", errors));
};
