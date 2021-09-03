import { Router } from "express";
import catchAsyncController from "../../middlewares/catchAsyncController";
import isAuth from "../../middlewares/isAuth";
import validateRequestBody from "../../middlewares/validateRequestBody";
import AuthController from "./controllers/AuthController";
import { loginBodySchema } from "./validationSchemas";

const AuthRouter = Router();
export default AuthRouter;

AuthRouter.get("/", catchAsyncController(AuthController.refreshToken));
AuthRouter.post(
  "/",
  validateRequestBody(loginBodySchema),
  catchAsyncController(AuthController.login)
);
AuthRouter.delete("/", isAuth, catchAsyncController(AuthController.logout));
