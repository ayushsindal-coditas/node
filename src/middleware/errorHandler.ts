import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

/**
 * The single place every error in the app funnels through — thrown ApiErrors,
 * validation failures, and unexpected bugs alike. Must be registered last and
 * keep all 4 parameters (err, req, res, next): that arity is how Express
 * recognizes an error-handling middleware.
 */
export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : 500;
  const message = err instanceof Error ? err.message : "Something went wrong";
  const errors = isApiError ? err.errors : [];

  if (env.nodeEnv !== "production" && err instanceof Error) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
