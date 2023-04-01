"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIO = void 0;
const express_1 = __importDefault(require("express"));
const socketio_service_1 = require("./src/lib/socketio/socketio.service");
const http_1 = __importDefault(require("http"));
const notify_route_1 = __importDefault(require("./src/route/notify.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const global_config_1 = require("./src/global.config");
/** SERVER CONFIGURATION */
const appExpress = (0, express_1.default)();
const httpServer = new http_1.default.Server(appExpress);
/** BODY PARSER CONFIGURATION */
appExpress.use(body_parser_1.default.json());
appExpress.use(body_parser_1.default.urlencoded({ extended: true }));
/** ROUTE CONFIGURATION */
appExpress.use(notify_route_1.default);
/** SOCKETIO CONFIGURATION */
exports.SocketIO = new socketio_service_1.SocketIOService(httpServer);
global_config_1.MongoDatabaseGlobal.connect();
/** START SERVER */
httpServer.listen(3001, function () {
    console.log("listening on *:3001");
});
