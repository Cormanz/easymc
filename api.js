"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.EasyMC = exports.Alt = exports.defaultProxy = void 0;
var got_1 = require("got");
var mineflayer_1 = require("mineflayer");
var minecraft_protocol_1 = require("minecraft-protocol");
exports.defaultProxy = 'https://easymc-serverproxy.glitch.me';
var Alt = /** @class */ (function () {
    function Alt(client, data) {
        this.client = client;
        this.data = data;
        this.token = this.data.token;
        this.username = this.data.username;
    }
    Alt.prototype.getSkin = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.get("/token/skin?" + this.token, { responseType: 'text' })];
            });
        });
    };
    /**
     * Renews this alt.
     * @deprecated Doesn't work since the renew endpoint has a captcha.
     */
    Alt.prototype.renew = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.renew(this.token)];
            });
        });
    };
    /**
     * Redeems an alt, including information like the full minecraft username and the session.
     */
    Alt.prototype.redeem = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.redeem(this.token)];
            });
        });
    };
    /**
     * Checks if this alt is expired.
     */
    Alt.prototype.isExpired = function () {
        return __awaiter(this, void 0, void 0, function () {
            var session, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.redeem().then(function (i) { return i.session; })];
                    case 1:
                        session = _a.sent();
                        return [4 /*yield*/, this.client.post('/session/status', {
                                json: {
                                    sessions: [session]
                                }
                            })];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res[session].expired];
                }
            });
        });
    };
    /**
     * Creates a client with `minecraft-protocol` that you can use to login to the alt and manage packets at a low level.
     * @param opts The options to use with `minecraft-protocol`.
     */
    Alt.prototype.createClient = function (opts) {
        var _a, _b;
        var defaults = {
            username: this.token,
            password: 'Password',
            authServer: (_a = opts.proxy) !== null && _a !== void 0 ? _a : exports.defaultProxy,
            sessionServer: (_b = opts.proxy) !== null && _b !== void 0 ? _b : exports.defaultProxy
        };
        return minecraft_protocol_1.createClient(__assign(__assign({}, defaults), opts));
    };
    /**
     * Creates a bot with `mineflayer` that you can use to manage the bot at a higher level.
     * @param opts The options to use with `mineflayer`.
     */
    Alt.prototype.createBot = function (opts) {
        var _a, _b;
        var defaults = {
            username: this.token,
            password: 'Password',
            authServer: (_a = opts.proxy) !== null && _a !== void 0 ? _a : exports.defaultProxy,
            sessionServer: (_b = opts.proxy) !== null && _b !== void 0 ? _b : exports.defaultProxy
        };
        return mineflayer_1.createBot(__assign(__assign({}, defaults), opts));
    };
    return Alt;
}());
exports.Alt = Alt;
var EasyMC = /** @class */ (function () {
    function EasyMC(api) {
        this.api = api;
        this.setCaptcha('Default');
    }
    /**
     * Sets the captcha to use for some requests
     * @deprecated
     * @param captcha The captcha to set it to
     */
    EasyMC.prototype.setCaptcha = function (captcha) {
        this.captcha = captcha;
        return this;
    };
    /**
     * Renews an alt from a token.
     * @deprecated Doesn't work since the renew endpoint has a captcha.
     * @param token The token to renew.
     */
    EasyMC.prototype.renew = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var alt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('/token/renew', {
                            json: {
                                token: token
                            }
                        })];
                    case 1:
                        alt = _a.sent();
                        return [2 /*return*/, alt];
                }
            });
        });
    };
    /**
     * Redeems an alt, including information like the full minecraft username and the session.
     * @param token The token to redeem.
     */
    EasyMC.prototype.redeem = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('/token/redeem', {
                            json: {
                                token: token,
                                captcha: this.captcha
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Generates an alt. May require you go to onto the EasyMC site first and get one so that you can refresh the captcha.
     * @param newAlt Whether to generate a new alt or use the last previously generated one
     */
    EasyMC.prototype.alt = function (newAlt) {
        if (newAlt === void 0) { newAlt = true; }
        return __awaiter(this, void 0, void 0, function () {
            var alt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(newAlt ? "/token?new=true" : "/token")];
                    case 1:
                        alt = _a.sent();
                        return [2 /*return*/, new Alt(this, alt)];
                }
            });
        });
    };
    /**
     * Sends a `GET` request to the EasyMC api on a lower level.
     * @param url The path for your request
     * @param options The options of the request
     */
    EasyMC.prototype.get = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                req = "" + this.api + url;
                return [2 /*return*/, got_1["default"].get(req, __assign({ responseType: 'json' }, options)).then(function (i) { return i.body; })];
            });
        });
    };
    /**
     * Sends at a `POST` request to the EasyMC api on a lower level.
     * @param url The path for your request
     * @param options The options of the request
     */
    EasyMC.prototype.post = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, got_1["default"].post("" + this.api + url, __assign({ responseType: 'json' }, options)).then(function (i) { return i.body; })];
            });
        });
    };
    /**
     * Gets the settings for the EasyMC client, like the version of the client.
     */
    EasyMC.prototype.clientSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get('/client/settings')];
            });
        });
    };
    /**
     * Gets the auth and session server for EasyMC.
     */
    EasyMC.prototype.getAuthServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.clientSettings().then(function (i) { return i.authServer; })];
            });
        });
    };
    EasyMC.prototype.join = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var arg, server, session, serverId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(args.length === 1)) return [3 /*break*/, 2];
                        arg = args[0];
                        server = void 0;
                        if (arg.serverId) {
                            server = arg.serverId;
                        }
                        else if (arg.serverHash) {
                            server = arg.serverHash;
                        }
                        return [4 /*yield*/, this.join(arg.session, server)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        session = args[0], serverId = args[1];
                        return [2 /*return*/, this.post('/session/join', {
                                json: {
                                    session: session,
                                    serverId: serverId
                                }
                            })];
                }
            });
        });
    };
    /**
     * Sets the server with the EasyMC API. May be needed for logging in. Returns a `got` response.
     * @param server The server to login to.
     * @param proxy The proxy to login to. Defaults to the easymc proxy on glitch. You can host your own proxy with the exported `createServer()` method.
     */
    EasyMC.prototype.setServer = function (server, proxy) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        proxy = proxy !== null && proxy !== void 0 ? proxy : exports.defaultProxy;
                        return [4 /*yield*/, got_1["default"].post(proxy + "/setserver", {
                                json: {
                                    server: server
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Creates a client with `minecraft-protocol` that you can use to login to an alt and manage packets at a low level.
     * @param opts The options to use with `minecraft-protocol`.
     */
    EasyMC.prototype.createClient = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.alt().then(function (i) { return i.createClient(opts); })];
            });
        });
    };
    /**
     * Creates a bot with `mineflayer` that you can use to manage the bot at a higher level.
     * @param opts The options to use with `mineflayer`.
     */
    EasyMC.prototype.createBot = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.alt().then(function (i) { return i.createBot(opts); })];
            });
        });
    };
    return EasyMC;
}());
exports.EasyMC = EasyMC;
var easymc = new EasyMC('https://api.easymc.io/v1');
exports["default"] = easymc;
