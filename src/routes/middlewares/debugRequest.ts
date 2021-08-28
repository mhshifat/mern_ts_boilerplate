import { NextFunction, Request, Response } from "express";
import logger from "../../lib/winston";

interface DebugRequestObj {
  method: string;
  path: string;
  params?: object;
  query?: object;
  body?: object;
}

export default function debugRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const preview: DebugRequestObj = {
    method: req?.method,
    path: req?.path,
  };

  switch (req?.method) {
    case "GET":
      preview["params"] = req.params;
      preview["query"] = req.query;
      break;
    case "POST":
      preview["body"] = req.body;
      break;
    case "PUT":
      preview["params"] = req.params;
      preview["body"] = req.body;
      break;
    case "DELETE":
      preview["params"] = req.params;
      break;
    default:
      break;
  }

  logger.info(JSON.stringify(preview, null, 4));

  return next();
}
