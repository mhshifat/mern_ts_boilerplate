"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("../../lib/winston"));
function debugRequest(req, res, next) {
    var preview = {
        path: req === null || req === void 0 ? void 0 : req.path,
        method: req === null || req === void 0 ? void 0 : req.method
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
    if (!!Object.values((preview === null || preview === void 0 ? void 0 : preview.params) || {}).length ||
        !!Object.values((preview === null || preview === void 0 ? void 0 : preview.query) || {}).length ||
        !!Object.values((preview === null || preview === void 0 ? void 0 : preview.body) || {}).length) {
        winston_1.default.info(JSON.stringify(preview, null, 4));
    }
    return next();
}
exports.default = debugRequest;
