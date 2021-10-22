import { Request, Response } from "express";
import {
  setCookieInResponse,
  successResponse
} from "../../../../utils/methods";
import UserService from "../../users/services/UserService";
import AuthService from "../services/AuthService";

const AuthController = {
  refreshToken: async (req: Request, res: Response) => {
    const { refresh_token } = req.cookies;
    const { user } = await AuthService.validateRefreshToken(refresh_token);
    if (user) {
      const auth = await AuthService.findAuth({ user_id: user._id });
      const { accessToken, refreshToken } = AuthService.generateTokens({
        user
      });
      await setCookieInResponse(res, { accessToken, refreshToken });
      auth.set("token", refreshToken);
      await auth.save();
    }
    return successResponse(req, res, {
      status: 200,
      user: user?._id,
      result: { user }
    });
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserService.findUser({ email });
    const auth = await AuthService.findAuth({ user_id: user._id });
    await auth.comparePassword(password);
    const { accessToken, refreshToken } = AuthService.generateTokens({ user });
    await setCookieInResponse(res, { accessToken, refreshToken });
    auth.set("token", refreshToken);
    await auth.save();
    return successResponse(req, res, {
      status: 200,
      user: user?._id,
      result: { user }
    });
  },
  logout: async (req: Request, res: Response) => {
    const userId = (req as any).user;
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return successResponse(req, res, {
      status: 200,
      user: userId,
      result: { user: null }
    });
  }
};

export default AuthController;
