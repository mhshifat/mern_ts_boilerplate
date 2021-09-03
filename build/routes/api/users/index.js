"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var catchAsyncController_1 = __importDefault(require("../../middlewares/catchAsyncController"));
var isAuth_1 = __importDefault(require("../../middlewares/isAuth"));
var validateRequestBody_1 = __importDefault(require("../../middlewares/validateRequestBody"));
var validationSchemas_1 = require("../auth/validationSchemas");
var UserController_1 = __importDefault(require("./controllers/UserController"));
var AuthRouter = express_1.Router();
exports.default = AuthRouter;
AuthRouter.get("/", isAuth_1.default, UserController_1.default.getUsers);
AuthRouter.post("/", validateRequestBody_1.default(validationSchemas_1.registerBodySchema), catchAsyncController_1.default(UserController_1.default.createUser));
