"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSwaggerSchema = void 0;
var mongoose_1 = require("mongoose");
var mongoose_to_swagger_1 = __importDefault(require("mongoose-to-swagger"));
var DocumentSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
}, { timestamps: true });
var User = mongoose_1.model("User", DocumentSchema, "users");
exports.UserSwaggerSchema = mongoose_to_swagger_1.default(User);
exports.default = User;
