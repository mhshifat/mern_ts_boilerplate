import { Response } from "express";

export const setCookieInResponse = async (
  res: Response,
  { accessToken, refreshToken }: { refreshToken: string; accessToken: string }
) => {
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
};
