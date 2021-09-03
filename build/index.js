"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("./lib/express"));
var mongoose_1 = __importDefault(require("./lib/mongoose"));
var winston_1 = __importDefault(require("./lib/winston"));
var server = express_1.default();
var _a = process.env, PORT = _a.PORT, MONGODB_URI = _a.MONGODB_URI;
mongoose_1.default(MONGODB_URI || "")
    .then(function () { return server.listen(PORT); })
    .then(function () {
    winston_1.default.info("Database connected!");
    winston_1.default.info("The server is running on http://localhost:" + PORT + "!");
})
    .catch(function (err) { return winston_1.default.error(err === null || err === void 0 ? void 0 : err.message); });
