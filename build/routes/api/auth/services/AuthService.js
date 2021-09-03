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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UserService_1 = __importDefault(require("../../users/services/UserService"));
var Auth_1 = __importDefault(require("../model/Auth"));
var JWT_SECRET = process.env.JWT_SECRET;
var AuthService = {
    findLoggedIn: function (_a) {
        var token = _a.token;
        return __awaiter(void 0, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Auth_1.default.findOne({ token: token })];
                    case 1:
                        doc = _b.sent();
                        if (!doc)
                            throw new Error("401:UnAuthorized!");
                        return [2 /*return*/, doc];
                }
            });
        });
    },
    findAuth: function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Auth_1.default.findOne(query)];
                case 1:
                    doc = _a.sent();
                    if (!doc)
                        throw new Error("401:UnAuthorized!");
                    return [2 /*return*/, doc];
            }
        });
    }); },
    createAuth: function (body) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Auth_1.default.create(body)];
        });
    }); },
    generateTokens: function (_a) {
        var user = _a.user;
        var payload = { uid: user._id };
        var accessToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "30m" });
        var refreshToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET + user.email, {
            expiresIn: "7d",
        });
        return { accessToken: accessToken, refreshToken: refreshToken };
    },
    validateRefreshToken: function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!token)
                            throw new Error();
                        uid = (jsonwebtoken_1.default.decode(token) || { uid: null }).uid;
                        if (!uid)
                            throw new Error();
                        return [4 /*yield*/, UserService_1.default.findUser({ _id: uid })];
                    case 1:
                        user = _a.sent();
                        jsonwebtoken_1.default.verify(token, JWT_SECRET + user.email);
                        return [2 /*return*/, { user: user }];
                    case 2:
                        err_1 = _a.sent();
                        // const errorMessage = "401:Invalid token!";
                        // throw new Error(errorMessage);
                        return [2 /*return*/, { user: null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
};
exports.default = AuthService;
