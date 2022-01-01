import { NextFunction, Request, Response } from "express";

export function ignoreFavicon(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl.includes("favicon.ico")) {
    return res.status(204).end();
  }
  next();
}
