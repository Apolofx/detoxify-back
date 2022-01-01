import express from "express";

const usersRouter = express.Router();

usersRouter.get("/", () => {
  //get all users
  console.log("users");
});

export { usersRouter };
