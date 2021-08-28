import { Router } from "express";
import api from "./api";
import debugRequest from "./middlewares/debugRequest";

export default function routes() {
  const router = Router();

  router.use(debugRequest);
  router.use("/auth", api.AUTH_API);
  router.use("/users", api.USERS_API);

  return router;
}
