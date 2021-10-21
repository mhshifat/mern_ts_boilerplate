"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var compression_1 = __importDefault(require("compression"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var routes_1 = __importDefault(require("../routes"));
var swagger_1 = require("./swagger");
function createServer() {
    var app = express_1.default();
    app.use([
        cors_1.default({
            origin: process.env.CLIENT_URI,
            credentials: true
        }),
        helmet_1.default(),
        morgan_1.default("dev"),
        compression_1.default(),
        cookie_parser_1.default(),
        express_1.default.json(),
        express_1.default.urlencoded({ extended: false })
    ]);
    app.get("/", function (_, res) { return res.send("Hello from Server"); });
    app.get("/api", function (_, res) { return res.send("Hello from API"); });
    app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
    app.use("/api/v1", routes_1.default());
    return app;
}
exports.default = createServer;
