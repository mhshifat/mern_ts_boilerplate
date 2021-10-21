import { NextFunction, Request, Response } from "express";
import { getLogEvent } from "../../utils/methods";
import {
  LogDocument,
  LogOutcomeEnum,
  LogTypeEnum
} from "../api/logs/model/Log";
import LogService from "../api/logs/services/LogService";

export default function catchAsyncController(
  fn: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<any>>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next)
      .then(() => {
        const logData: LogDocument = {
          ip: req.ip,
          event: getLogEvent(req.originalUrl),
          event_type: req.method,
          browser: req.headers["user-agent"] || "",
          outcome: LogOutcomeEnum.SUCCESS,
          type: LogTypeEnum.AUDIT,
          user: (req as any)?.user || null
        };
        LogService.createLog(logData);
      })
      .catch((err) => {
        const logData: LogDocument = {
          ip: req.ip,
          event: getLogEvent(req.originalUrl),
          event_type: req.method,
          browser: req.headers["user-agent"] || "",
          outcome: LogOutcomeEnum.FAILED,
          type: LogTypeEnum.AUDIT,
          user: (req as any)?.user || null
        };
        LogService.createLog(logData);
        const errContainsColon = err.message ? err.message.split(":") : [];
        return res
          .status(
            err.name === "CastError"
              ? 400
              : errContainsColon?.length
              ? errContainsColon[0]
              : 500
          )
          .json({
            error:
              err.name === "CastError"
                ? "Please provide a valid ID"
                : errContainsColon?.length === 2
                ? errContainsColon[1]
                : "Something went wrong, please try again later"
          });
      });
  };
}
