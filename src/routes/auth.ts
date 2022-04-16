import express from "express";
import jwt from "jsonwebtoken";
import prisma from "@database";
import bcrypt from "bcryptjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { useEmailAuthentication } from "@middlewares";
import { env, USER_ROLE_NAMES } from "@config";

const auth = express.Router();

//TODO delegate business logic to controllers
//TODO add tests to auth routes
//TODO review auth logic. Its weird, a user can be created without email and password but login requires login and password

auth.post("/login", useEmailAuthentication);

auth.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  try {
    const { id, role = USER_ROLE_NAMES.REGULAR } = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });
    const jwtPayload = {
      id,
      role,
    };
    return res.json({
      token: jwt.sign(jwtPayload, env.JWT_SECRET),
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError)
      return res.status(409).json({ message: "Email already in use" });
    next(e);
  }
});
export { auth };
