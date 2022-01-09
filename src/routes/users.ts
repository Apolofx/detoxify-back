import express, { NextFunction, Request, Response } from "express";
import { PrismaClient, User, UserDetails } from "@prisma/client";
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
  const { name, email, ...userDetails }: User & UserDetails = data;
  if (data) {
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          userDetails: {
            create: {
              ...userDetails,
            },
          },
        },
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

users.get("/:id/details", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ message: "Invalid user id value" });
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      userDetails: true,
    },
  });
  return res.json(user);
});

users.get("/:id/achievements", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ message: "Invalid user id value" });
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      achievements: true,
    },
  });
  return res.json(user);
});

/**
 * @todo add /users/:id/events
 */
export { users };
