import express from "express";
import { users } from "./users";

const mainRouter = express.Router();

mainRouter.use("/users", users);

export { health } from "./health";
export { mainRouter };
