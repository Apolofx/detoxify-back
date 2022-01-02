import express from "express";

const health = express.Router();

health.get("/", (_req, res) => {
  const response = {
    uptime: process.uptime(),
    status: "OK",
    date: new Date(),
  };
  res.status(200).json(response);
});

export { health };
