import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
console.log(process.env);
const app = express();
app.use(cors());
app.use(express.json());

app.post("/users", async (req, res, next) => {
  const { body: data } = req;
  if (data) {
    try {
      const newUser = await prisma.user.create({
        data,
      });
      res.send(newUser);
    } catch (e) {
      console.log(e);
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
      id: id,
    },
  });
  res.send(user);
});

app.use("*", (req, res) => {
  res.sendStatus(400);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json("Internal Server Error");
});

export { app };
