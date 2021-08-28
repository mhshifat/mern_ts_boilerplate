import { NextFunction, Request, Response } from "express";

export default function catchAsyncController(
  fn: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<any>>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch((err) => {
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
              : "Something went wrong, please try again later",
        });
    });
  };
}
