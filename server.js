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
exports.__esModule = true;
exports.createServer = void 0;
var express = require("express");
var api_1 = require("./api");
exports.createServer = function () {
    var app = express();
    app.use(express.json());
    var ipservers = {};
    app.post("/authenticate", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api_1["default"].redeem(req.body.username)];
                case 1:
                    response = _a.sent();
                    res.send({
                        accessToken: response.session,
                        clientToken: req.body.clientToken,
                        availableProfiles: [
                            {
                                agent: req.body.agent.name,
                                id: response.mcName,
                                name: response.mcName,
                                userId: response.mcName,
                                createdAt: 0,
                                legacyProfile: false,
                                suspended: false,
                                paid: true,
                                migrated: false
                            },
                        ],
                        selectedProfile: {
                            agent: req.body.agent.name,
                            id: response.mcName,
                            name: response.mcName,
                            userId: response.mcName,
                            createdAt: 0,
                            legacyProfile: false,
                            suspended: false,
                            paid: true,
                            migrated: false
                        },
                        user: {
                            id: response.mcName,
                            email: response.mcName,
                            username: response.mcName,
                            registerIp: "192.168.1.*",
                            migratedFrom: "minecraft.net",
                            migratedAt: 0,
                            registeredAt: 0,
                            passwordChangedAt: 0,
                            dateOfBirth: 0,
                            suspended: false,
                            blocked: false,
                            secured: true,
                            migrated: false,
                            emailVerified: true,
                            legacyUser: false,
                            verifiedByParent: false,
                            properties: []
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    app.post("/validate", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.status(403).send();
            return [2 /*return*/];
        });
    }); });
    app.post("/refresh", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.status(403).send();
            return [2 /*return*/];
        });
    }); });
    app.post("/session/minecraft/join", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api_1["default"].join({
                        session: req.body.accessToken,
                        serverId: req.body.serverId
                    })];
                case 1:
                    response = _a.sent();
                    if (true) {
                        res.status(204).send();
                    }
                    else {
                        res.status(403).send();
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    app.post("/setserver", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var headers;
        return __generator(this, function (_a) {
            headers = req.headers['x-forwarded-for'];
            ipservers[headers.split(",")[0]] =
                req.body.server;
            res.send({ success: true });
            return [2 /*return*/];
        });
    }); });
    return app;
};
