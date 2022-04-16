import express, { NextFunction, Request, Response } from "express";
import { User, UserDetails } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";
import prisma from "@database";
import { helpers } from "@utils";
import { verifyRole } from "@middlewares";

const users = express.Router();

// /api/users
users.get(
  "/",
  verifyRole("ADMIN"),
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await prisma.user.findMany();
      const usersWithoutPassword = users.map((user) =>
        helpers.exclude(user, "password")
      );
      if (!users) return res.status(304);
      return res.json(usersWithoutPassword);
    } catch (e) {
      next(e);
    }
  }
);

//TODO review --> an already registered and authenticated user can create more users

// Get All Users

users.post("/", verifyRole("ADMIN"), async (req, res, next) => {
  const { body: data } = req;
  const { name, email, password, ...userDetails }: User & UserDetails = data;
  if (data) {
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
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

//Get User by ID
users.get("/:id", verifyRole("REGULAR"), async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ message: "Invalid user id value" });
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return res.sendStatus(404);
    const userWithoutPassword = helpers.exclude(user, "password");
    return res.json(userWithoutPassword);
  } catch (e) {
    next(e);
  }
});

//Get user details by userID
users.get("/:id/details", verifyRole("REGULAR"), async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ message: "Invalid user id value" });
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        userDetails: true,
      },
    });
    const userWithoutPassword = helpers.exclude(user as User, "password"); // forcing type User
    return res.json(userWithoutPassword);
  } catch (e) {
    next(e);
  }
});

//Get user achievements by userID
users.get(
  "/:id/achievements",
  verifyRole("REGULAR"),
  async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid user id value" });
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          achievements: true,
        },
      });
      const userWithoutPassword = helpers.exclude(user as User, "password");
      return res.json(userWithoutPassword);
    } catch (e) {
      next(e);
    }
  }
);

//Get user snapshot (user and its related entities)
users.get("/:id/snapshot", verifyRole("REGULAR"), async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ message: "Invalid user id value" });
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        achievements: true,
        userDetails: true,
        userConfig: true,
      },
    });
    const userWithoutPassword = helpers.exclude(user as User, "password");
    return res.json(userWithoutPassword);
  } catch (e) {
    next(e);
  }
});

//Update User by ID
users.put("/:id", verifyRole("REGULAR"), async (req, res, next) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  if (!Object.keys(body).length) return res.sendStatus(304);
  try {
    const updatedUser = await prisma.user.update({
      data: { ...body },
      where: {
        id,
      },
    });
    return res.json(updatedUser);
  } catch (e: any) {
    if (e.code === "P2025") return res.sendStatus(404);
    next(e);
  }
});

/**
 * @todo add /users/:id/events
 */
export { users };
