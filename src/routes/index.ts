import express from "express";
import { users } from "./users";
import { pages } from "./pages";
import { auth } from "./auth";

const mainRouter = express.Router();

mainRouter.use("/users", users);

//@todo add /teams route

export { health } from "./health";
export { mainRouter, pages as pagesRouter, auth as authRouter };
