import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export default async function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { access_token } = req.cookies;
    if (!access_token) throw new Error();
    const { uid } = (jwt.verify(access_token, JWT_SECRET!) || {
      uid: null
    }) as any;
    if (!uid) throw new Error();
    (req as any).user = uid;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token!" });
  }
}
