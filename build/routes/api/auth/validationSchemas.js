"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginBodySchema = exports.loginBodySchema = void 0;
var joi_1 = __importDefault(require("joi"));
var joi_to_swagger_1 = __importDefault(require("joi-to-swagger"));
exports.loginBodySchema = {
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
    })
        .required(),
    password: joi_1.default.string().required()
};
exports.LoginBodySchema = joi_to_swagger_1.default(joi_1.default.object(exports.loginBodySchema)).swagger;
