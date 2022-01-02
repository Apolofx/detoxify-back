import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";
const users = express.Router();
const prisma = new PrismaClient();

// /api/users
users.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) return res.status(304);
    return res.json(users);
  } catch (e) {
    next(e);
  }
});

users.post("/", async (req, res, next) => {
  const { body: data } = req;
  if (data) {
    try {
      const newUser = await prisma.user.create({
        data,
      });
      res.send(newUser);
    } catch (e: any) {
      if (e instanceof PrismaClientValidationError)
        return res
          .status(400)
          .json({ message: "Missing parameter in request body" });
      if (e instanceof PrismaClientKnownRequestError)
        return res.status(409).json({ message: "Email already in use" });
      next(e);
    }
  }
});

users.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ message: "Invalid user id value" });
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) return res.sendStatus(404);
  return res.json(user);
});

export { users };
