import { Request, Response } from "express";
import {
  LogDocument,
  LogOutcomeEnum,
  LogTypeEnum
} from "../routes/api/logs/model/Log";
import LogService from "../routes/api/logs/services/LogService";

export const setCookieInResponse = async (
  res: Response,
  { accessToken, refreshToken }: { refreshToken: string; accessToken: string }
) => {
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30
  });
};

export const getLogEvent = (url: string): string => {
  const event = url.split("/")[3];
  return event.charAt(0).toUpperCase() + event.slice(1);
};

export const successResponse = async (
  req: Request,
  res: Response,
  options: { user?: string; status: number; result: any }
) => {
  const logData: LogDocument = {
    ip: req.ip,
    event: getLogEvent(req.originalUrl),
    event_type: req.method,
    browser: req.headers["user-agent"] || "",
    outcome: LogOutcomeEnum.SUCCESS,
    type: LogTypeEnum.AUDIT,
    user: (req as any)?.user || options?.user || null
  };
  await LogService.createLog(logData);
  return res.status(options.status).json({ success: true, ...options.result });
};
