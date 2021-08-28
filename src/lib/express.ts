import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "../routes";

export default function createServer() {
  const app = express();

  app.use([
    cors({
      origin: process.env.CLIENT_URI,
      credentials: true,
    }),
    helmet(),
    morgan("dev"),
    compression(),
    cookieParser(),
    express.json(),
    express.urlencoded({ extended: false }),
  ]);

  app.get("/", (_, res) => res.send("Hello from Server"));
  app.get("/api", (_, res) => res.send("Hello from API"));
  app.use("/api/v1", routes());

  return app;
}