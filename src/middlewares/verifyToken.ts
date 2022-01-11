import { IncomingHttpHeaders } from "http";
import { Request, Response, NextFunction } from "express";
import { env } from "../config";
import jwt from "jsonwebtoken";

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req.headers);
    jwt.verify(token, env.JWT_SECRET, (err, payload) => {
      console.log(payload);
      if (err) res.sendStatus(401);
      req.authInfo = payload;
      next();
    });
  } catch (e: any) {
    if (e instanceof AuthenticationError)
      return res.status(401).json({ message: e.message });
    next(e);
  }
};

/**
 * Abstracts token extraction from request headers
 * and throws corresponding errors if missing header
 * or invalid header scheme.
 * @param headers
 * @returns string
 */
function extractToken(headers: IncomingHttpHeaders) {
  const authorization = headers.authorization;
  if (!authorization)
    throw new AuthenticationError("Missing authorization header");
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer")
    throw new AuthenticationError("Missing bearer scheme");
  return token;
}
