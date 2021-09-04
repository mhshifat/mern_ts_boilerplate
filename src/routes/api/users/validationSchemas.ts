import Joi from "joi";
import j2s from "joi-to-swagger";

export const registerBodySchema = {
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] }
    })
    .required(),
  password: Joi.string().required()
};

export const { swagger: RegisterBodySchema } = j2s(
  Joi.object(registerBodySchema)
);
