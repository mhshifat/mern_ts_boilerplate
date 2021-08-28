import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default function validateRequestBody(joiSchema: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Joi.object(joiSchema).validateAsync(req.body, {
        abortEarly: false,
      });
      return next();
    } catch (err) {
      return res.status(422).json({
        success: false,
        errors:
          err?.details?.map((error: any) => ({
            path: error.path[0],
            message: error.message,
          })) || [],
      });
    }
  };
}
