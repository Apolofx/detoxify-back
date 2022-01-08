import express from "express";
import { users } from "./users";

const mainRouter = express.Router();

mainRouter.use("/users", users);
//@todo add /teams route

export { health } from "./health";
export { mainRouter };
