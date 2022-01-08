require("dotenv").config();
import { app } from "./app";

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

//this is due to some issues with prisma and ts-node-dev
process.on("SIGTERM", (err: any) => {
  if (process.env.TS_NODE_DEV) process.exit(1);
});
