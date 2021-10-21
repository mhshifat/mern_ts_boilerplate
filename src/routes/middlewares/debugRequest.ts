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
    path: req?.path,
    method: req?.method
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

  if (
    !!Object.values(preview?.params || {}).length ||
    !!Object.values(preview?.query || {}).length ||
    !!Object.values(preview?.body || {}).length
  ) {
    logger.info(JSON.stringify(preview, null, 4));
  }

  return next();
}
