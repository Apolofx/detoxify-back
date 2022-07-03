import express from "express";
import { verifyToken } from "@middlewares";
import { users } from "./users";
import { auth } from "./auth";

const mainRouter = express.Router();

//Every users resource is token protected
mainRouter.use("/users", verifyToken, users);
mainRouter.use("/auth", auth);

//@todo add /teams route
export { health } from "./health";
export { mainRouter };
