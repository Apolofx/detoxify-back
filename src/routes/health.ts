import express from "express";

const health = express.Router();

health.get("/", (_req, res) => {
  const response = {
    uptime: process.uptime(),
    status: "OK",
    date: new Date(),
    environment: process.env.NODE_ENV,
  };
  res.status(200).json(response);
});

export { health };
