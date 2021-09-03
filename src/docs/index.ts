import swaggerJSDoc from "swagger-jsdoc";
import { AuthSwaggerSchema } from "../routes/api/auth/model/Auth";
import {
  LoginBodySchema,
  RegisterBodySchema
} from "../routes/api/auth/validationSchemas";
import { UserSwaggerSchema } from "../routes/api/users/model/User";
import authRoutes from "./authRoutes";
import tags from "./tags";
import userRoutes from "./userRoutes";

export default {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Docs",
      version: "1.0.0",
      contact: {
        name: "Mehedi Hassan Shifat",
        email: "mehedihassanshifat01@gmail.com",
        url: "https://mhs-dev.netlify.app"
      },
      description: "APIs for"
    },
    servers: [
      { description: "Local Server", url: "http://localhost:5000/api/v1" }
    ],
    tags,
    components: {
      schemas: {
        AuthSwaggerSchema,
        UserSwaggerSchema,
        LoginBodySchema,
        RegisterBodySchema,
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string"
            }
          }
        },
        Errors: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: {
                    type: "string"
                  },
                  message: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    paths: {
      ...authRoutes,
      ...userRoutes
    }
  },
  apis: []
} as swaggerJSDoc.Options;
