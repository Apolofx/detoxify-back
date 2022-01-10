import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const auth = express.Router();
const prisma = new PrismaClient();

//TODO delegate business logic to controllers
//TODO add tests to auth routes
//TODO review auth logic. Its weird, a user can be created without email and password but login requires login and password

auth.post("/login", useEmailAuthentication);

auth.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });
    return res.json({
      token: jwt.sign(newUser, process.env.JWT_SECRET as string),
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError)
      return res.status(409).json({ message: "Email already in use" });
    next(e);
  }
});
export { auth };

//middlewares
function useEmailAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate("local", function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);
    res.json({ token: jwt.sign(user, process.env.JWT_SECRET as string) });
  })(req, res, next);
}
