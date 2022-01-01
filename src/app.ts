import "./utils/helpers/sentry";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import * as Sentry from "@sentry/node";
import { SentryInit } from "./utils/helpers";

import { PrismaClient } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";
import { ignoreFavicon } from "./middlewares";

const prisma = new PrismaClient();
const app = express();

SentryInit(app);
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(ignoreFavicon);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

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
  if (!id) return res.status(400).json({ message: "Invalid user id value" });
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
  throw new Error();
  res.sendStatus(400);
});

app.use(Sentry.Handlers.errorHandler());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json("Internal Server Error");
});

export { app };
