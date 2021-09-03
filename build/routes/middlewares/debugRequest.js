"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("../../lib/winston"));
function debugRequest(req, res, next) {
    var preview = {
        method: req === null || req === void 0 ? void 0 : req.method,
        path: req === null || req === void 0 ? void 0 : req.path
    };
    switch (req === null || req === void 0 ? void 0 : req.method) {
        case "GET":
            preview["params"] = req.params;
            preview["query"] = req.query;
            break;
        case "POST":
            preview["body"] = req.body;
            break;
        case "PUT":
            preview["params"] = req.params;
            preview["body"] = req.body;
            break;
        case "DELETE":
            preview["params"] = req.params;
            break;
        default:
            break;
    }
    winston_1.default.info(JSON.stringify(preview, null, 4));
    return next();
}
exports.default = debugRequest;
