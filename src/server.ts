import { app } from "./app";

app.listen(3000, () => console.log("Express app listening on port 3000 "));

//this is due to some issues with prisma and ts-node-dev
process.on("SIGTERM", (err: any) => {
  if (process.env.TS_NODE_DEV) process.exit(1);
});
