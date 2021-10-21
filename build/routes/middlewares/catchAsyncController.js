"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var methods_1 = require("../../utils/methods");
var Log_1 = require("../api/logs/model/Log");
var LogService_1 = __importDefault(require("../api/logs/services/LogService"));
function catchAsyncController(fn) {
    return function (req, res, next) {
        return fn(req, res, next)
            .then(function () {
            var _a;
            var logData = {
                ip: req.ip,
                event: methods_1.getLogEvent(req.originalUrl),
                event_type: req.method,
                browser: req.headers["user-agent"] || "",
                outcome: Log_1.LogOutcomeEnum.SUCCESS,
                type: Log_1.LogTypeEnum.AUDIT,
                user: ((_a = req) === null || _a === void 0 ? void 0 : _a.user) || null
            };
            LogService_1.default.createLog(logData);
        })
            .catch(function (err) {
            var _a;
            var logData = {
                ip: req.ip,
                event: methods_1.getLogEvent(req.originalUrl),
                event_type: req.method,
                browser: req.headers["user-agent"] || "",
                outcome: Log_1.LogOutcomeEnum.FAILED,
                type: Log_1.LogTypeEnum.AUDIT,
                user: ((_a = req) === null || _a === void 0 ? void 0 : _a.user) || null
            };
            LogService_1.default.createLog(logData);
            var errContainsColon = err.message ? err.message.split(":") : [];
            return res
                .status(err.name === "CastError"
                ? 400
                : (errContainsColon === null || errContainsColon === void 0 ? void 0 : errContainsColon.length)
                    ? errContainsColon[0]
                    : 500)
                .json({
                error: err.name === "CastError"
                    ? "Please provide a valid ID"
                    : (errContainsColon === null || errContainsColon === void 0 ? void 0 : errContainsColon.length) === 2
                        ? errContainsColon[1]
                        : "Something went wrong, please try again later"
            });
        });
    };
}
exports.default = catchAsyncController;
