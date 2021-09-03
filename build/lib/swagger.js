"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var docs_1 = __importDefault(require("../docs"));
exports.swaggerSpec = swagger_jsdoc_1.default(docs_1.default);
