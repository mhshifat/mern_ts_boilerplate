"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var methods_1 = require("../../../../utils/methods");
var UserService_1 = __importDefault(require("../../users/services/UserService"));
var AuthService_1 = __importDefault(require("../services/AuthService"));
var AuthController = {
    refreshToken: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var refresh_token, user, auth, _a, accessToken, refreshToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    refresh_token = req.cookies.refresh_token;
                    return [4 /*yield*/, AuthService_1.default.validateRefreshToken(refresh_token)];
                case 1:
                    user = (_b.sent()).user;
                    if (!user) return [3 /*break*/, 5];
                    return [4 /*yield*/, AuthService_1.default.findAuth({ user_id: user._id })];
                case 2:
                    auth = _b.sent();
                    _a = AuthService_1.default.generateTokens({
                        user: user
                    }), accessToken = _a.accessToken, refreshToken = _a.refreshToken;
                    return [4 /*yield*/, methods_1.setCookieInResponse(res, { accessToken: accessToken, refreshToken: refreshToken })];
                case 3:
                    _b.sent();
                    auth.set("token", refreshToken);
                    return [4 /*yield*/, auth.save()];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [2 /*return*/, methods_1.successResponse(req, res, {
                        status: 200,
                        user: user === null || user === void 0 ? void 0 : user._id,
                        result: { user: user }
                    })];
            }
        });
    }); },
    login: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, user, auth, _b, accessToken, refreshToken;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, UserService_1.default.findUser({ email: email })];
                case 1:
                    user = _c.sent();
                    return [4 /*yield*/, AuthService_1.default.findAuth({ user_id: user._id })];
                case 2:
                    auth = _c.sent();
                    return [4 /*yield*/, auth.comparePassword(password)];
                case 3:
                    _c.sent();
                    _b = AuthService_1.default.generateTokens({ user: user }), accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                    return [4 /*yield*/, methods_1.setCookieInResponse(res, { accessToken: accessToken, refreshToken: refreshToken })];
                case 4:
                    _c.sent();
                    auth.set("token", refreshToken);
                    return [4 /*yield*/, auth.save()];
                case 5:
                    _c.sent();
                    return [2 /*return*/, methods_1.successResponse(req, res, {
                            status: 200,
                            user: user === null || user === void 0 ? void 0 : user._id,
                            result: { user: user }
                        })];
            }
        });
    }); },
    logout: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId;
        return __generator(this, function (_a) {
            userId = req.user;
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");
            return [2 /*return*/, methods_1.successResponse(req, res, {
                    status: 200,
                    user: userId,
                    result: { user: null }
                })];
        });
    }); }
};
exports.default = AuthController;
