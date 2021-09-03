import { Router } from "express";
import catchAsyncController from "../../middlewares/catchAsyncController";
import isAuth from "../../middlewares/isAuth";
import validateRequestBody from "../../middlewares/validateRequestBody";
import { registerBodySchema } from "../auth/validationSchemas";
import UserController from "./controllers/UserController";

const AuthRouter = Router();
export default AuthRouter;

AuthRouter.get("/", isAuth, UserController.getUsers);
AuthRouter.post(
  "/",
  validateRequestBody(registerBodySchema),
  catchAsyncController(UserController.createUser)
);
