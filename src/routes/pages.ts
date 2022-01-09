import express from "express";

const pages = express.Router();
pages.use(
  "/privacy-policy",
  express.static(process.cwd() + "/src/public/privacy.html")
);
pages.use("/terms", express.static(process.cwd() + "/src/public/terms.html"));

export { pages };
