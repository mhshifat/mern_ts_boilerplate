"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var api_1 = __importDefault(require("./api"));
var debugRequest_1 = __importDefault(require("./middlewares/debugRequest"));
function routes() {
    var router = express_1.Router();
    router.use(debugRequest_1.default);
    router.use("/auth", api_1.default.AUTH_API);
    router.use("/users", api_1.default.USERS_API);
    router.use("/logs", api_1.default.LOGS_API);
    return router;
}
exports.default = routes;
