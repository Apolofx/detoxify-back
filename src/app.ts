import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  const response = {
    uptime: process.uptime(),
    status: "OK",
    date: new Date(),
  };
  res.status(200).json(response);
});

app.post("/users", async (req, res, next) => {
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

app.get("/users", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.send(allUsers);
});
app.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) return res.sendStatus(404);
  return res.json(user);
});

app.use("/users/*", (req, res) => {
  res.sendStatus(404);
});
app.use("*", (req, res) => {
  res.sendStatus(400);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json("Internal Server Error");
});

export { app };
