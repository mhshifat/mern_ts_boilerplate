import { Request, Response } from "express";
import AuthService from "../../auth/services/AuthService";
import UserService from "../services/UserService";

const UserController = {
  getUsers: async (req: Request, res: Response) => {
    return res.status(200).json({ message: "All Users" });
  },
  createUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    await UserService.findNullUser({ email });
    const user = await UserService.createUser(req.body);
    await AuthService.createAuth({ password, user_id: user._id });
    return res.status(200).json({ user });
  },
};

export default UserController;
