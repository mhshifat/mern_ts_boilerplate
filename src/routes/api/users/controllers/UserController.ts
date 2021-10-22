import { Request, Response } from "express";
import { successResponse } from "../../../../utils/methods";
import AuthService from "../../auth/services/AuthService";
import UserService from "../services/UserService";

const UserController = {
  getUsers: async (req: Request, res: Response) => {
    return successResponse(req, res, {
      status: 200,
      result: { message: "All Users" }
    });
  },
  createUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    await UserService.findNullUser({ email });
    const user = await UserService.createUser(req.body);
    await AuthService.createAuth({ password, user_id: user._id });
    return successResponse(req, res, {
      status: 200,
      result: { user }
    });
  }
};

export default UserController;
