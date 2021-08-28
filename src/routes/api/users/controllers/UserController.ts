import { Request, Response } from "express";

const UserController = {
  getUsers: async (req: Request, res: Response) => {
    return res.status(200).json({ message: "All Users" });
  },
};

export default UserController;
