"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Auth_1 = require("../routes/api/auth/model/Auth");
var validationSchemas_1 = require("../routes/api/auth/validationSchemas");
var User_1 = require("../routes/api/users/model/User");
var validationSchemas_2 = require("../routes/api/users/validationSchemas");
var authRoutes_1 = __importDefault(require("./authRoutes"));
var tags_1 = __importDefault(require("./tags"));
var userRoutes_1 = __importDefault(require("./userRoutes"));
exports.default = {
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
        tags: tags_1.default,
        components: {
            schemas: {
                AuthSwaggerSchema: Auth_1.AuthSwaggerSchema,
                UserSwaggerSchema: User_1.UserSwaggerSchema,
                LoginBodySchema: validationSchemas_1.LoginBodySchema,
                RegisterBodySchema: validationSchemas_2.RegisterBodySchema,
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
        paths: __assign(__assign({}, authRoutes_1.default), userRoutes_1.default)
    },
    apis: []
};
