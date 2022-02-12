import "./utils/helpers/sentry";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import * as Sentry from "@sentry/node";
import swaggerUi from "swagger-ui-express";
import { SentryInit, LocalStrategy } from "./utils/helpers";
import { ignoreFavicon } from "./middlewares";
import { swaggerDocument } from "./docs";
import { health, mainRouter, authRouter } from "./routes";
import passport from "passport";

const app = express();

SentryInit(app);
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

//@todo add helmet
//@todo secure routes with auth middleware

passport.use(LocalStrategy);
app.use(ignoreFavicon);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("./src/public"));
app.use(passport.initialize());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/health", health);
app.use("/auth", authRouter);
app.use("/api", mainRouter);

app.use("*", (req, res) => {
  res.sendStatus(400);
});

app.use(Sentry.Handlers.errorHandler());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  return res.status(500).json({ message: "Internal Server Error" });
});
export { app };
