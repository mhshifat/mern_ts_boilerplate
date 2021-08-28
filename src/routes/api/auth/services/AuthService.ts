import jwt from "jsonwebtoken";
import { FilterQuery } from "mongoose";
import { UserDocument } from "../../users/model/User";
import UserService from "../../users/services/UserService";
import Auth, { AuthDocument } from "../model/Auth";

const { JWT_SECRET } = process.env;

const AuthService = {
  findLoggedIn: async ({ token }: { token: AuthDocument["token"] }) => {
    const doc = await Auth.findOne({ token });
    if (!doc) throw new Error("401:UnAuthorized!");
    return doc;
  },
  findAuth: async (query: FilterQuery<AuthDocument>) => {
    const doc = await Auth.findOne(query as any);
    if (!doc) throw new Error("401:UnAuthorized!");
    return doc;
  },
  createAuth: async (body: AuthDocument) => {
    return Auth.create(body);
  },
  generateTokens({ user }: { user: UserDocument }) {
    const payload = { uid: (user as any)._id };
    const accessToken = jwt.sign(payload, JWT_SECRET!, { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, JWT_SECRET! + user.email, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  },
  async validateRefreshToken(token: AuthDocument["token"]) {
    try {
      if (!token) throw new Error();
      const { uid } = (jwt.decode(token) || { uid: null }) as any;
      if (!uid) throw new Error();
      const user = await UserService.findUser({ _id: uid });
      jwt.verify(token, JWT_SECRET! + user.email);
      return { user };
    } catch (err) {
      // const errorMessage = "401:Invalid token!";
      // throw new Error(errorMessage);
      return { user: null };
    }
  },
};

export default AuthService;
