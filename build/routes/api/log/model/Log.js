"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogSwaggerSchema = void 0;
var mongoose_1 = require("mongoose");
var mongoose_to_swagger_1 = __importDefault(require("mongoose-to-swagger"));
var LogOutcomeEnum;
(function (LogOutcomeEnum) {
    LogOutcomeEnum["FAILED"] = "FAILED";
    LogOutcomeEnum["SUCCESS"] = "SUCCESS";
})(LogOutcomeEnum || (LogOutcomeEnum = {}));
var LogTypeEnum;
(function (LogTypeEnum) {
    LogTypeEnum["AUDIT"] = "AUDIT";
})(LogTypeEnum || (LogTypeEnum = {}));
var DocumentSchema = new mongoose_1.Schema({
    ip: { type: String, required: true },
    event: { type: String, required: true },
    browser: { type: String, required: true },
    outcome: { type: String, required: true },
    type: { type: String, required: true }
}, { timestamps: true });
var Log = mongoose_1.model("Log", DocumentSchema, "logs");
exports.LogSwaggerSchema = mongoose_to_swagger_1.default(Log);
exports.default = Log;
