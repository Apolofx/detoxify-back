import express from "express";
import { users } from "./users";
import { auth } from "./auth";

const mainRouter = express.Router();

mainRouter.use("/users", users);

//@todo add /teams route

export { health } from "./health";
export { mainRouter, auth as authRouter };
