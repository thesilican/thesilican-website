import express from "express";
import path from "path";
import { apiRouter } from "./api";
import env from "./env";

const app = express();

app.use("/api", apiRouter);

app.use(
  "/",
  express.static(path.join(process.cwd(), "frontend/homepage/build"))
);

app.use(
  "/latex",
  express.static(path.join(process.cwd(), "frontend/latex/build"))
);

const server = app.listen(env.PORT, () =>
  console.log("Listening on port", env.PORT)
);

// Handle SIGINT and SIGTERM
let exited = false;
const handleExit = () => {
  if (exited) return;
  exited = true;
  server.close();
  console.log("Gracefully exited");
};
process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);
