import { Router } from "express";
import isAuth from "../../middlewares/isAuth";
import UserController from "./controllers/UserController";

const AuthRouter = Router();
export default AuthRouter;

AuthRouter.get("/", isAuth, UserController.getUsers);
