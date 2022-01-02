import "./utils/helpers/sentry";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import * as Sentry from "@sentry/node";
import { SentryInit } from "./utils/helpers";
import { ignoreFavicon } from "./middlewares";
import * as routes from "./routes";

const app = express();

SentryInit(app);
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(ignoreFavicon);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/health", routes.health);
app.use("/users", routes.users);

app.use("*", (req, res) => {
  res.sendStatus(400);
});

app.use(Sentry.Handlers.errorHandler());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json("Internal Server Error");
});
export { app };
