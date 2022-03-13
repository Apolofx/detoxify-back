import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { env } from "@config";

export function useEmailAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate("local", function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);
    res.json({ token: jwt.sign(user, env.JWT_SECRET) });
  })(req, res, next);
}
