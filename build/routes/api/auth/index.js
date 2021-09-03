"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var catchAsyncController_1 = __importDefault(require("../../middlewares/catchAsyncController"));
var isAuth_1 = __importDefault(require("../../middlewares/isAuth"));
var validateRequestBody_1 = __importDefault(require("../../middlewares/validateRequestBody"));
var AuthController_1 = __importDefault(require("./controllers/AuthController"));
var validationSchemas_1 = require("./validationSchemas");
var AuthRouter = express_1.Router();
exports.default = AuthRouter;
AuthRouter.get("/", catchAsyncController_1.default(AuthController_1.default.refreshToken));
AuthRouter.post("/", validateRequestBody_1.default(validationSchemas_1.loginBodySchema), catchAsyncController_1.default(AuthController_1.default.login));
AuthRouter.delete("/", isAuth_1.default, catchAsyncController_1.default(AuthController_1.default.logout));
