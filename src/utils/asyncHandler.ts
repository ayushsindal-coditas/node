import { NextFunction, Request, Response } from "express";

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * Express does not catch rejected promises from async route handlers on its own
 * (in Express 4). Wrapping every controller in this forwards any thrown/rejected
 * error to next(err), so it reaches the centralized errorHandler instead of
 * crashing the process or hanging the request.
 */
export const asyncHandler = (handler: AsyncRouteHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};
