"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationSocketIO = void 0;
const global_config_1 = require("../../global.config");
const AuthorizationSocketIO = (socket, next) => {
    const accessToken = socket.handshake.auth.accesstoken;
    if (!accessToken) {
        next(new Error('SOCKET.IO Authentication error: missing accesstoken'));
    }
    const userId = socket.handshake.query.userId;
    if (!userId) {
        next(new Error('SOCKET.IO Authentication error: missing userId'));
    }
    const isValidToken = global_config_1.TokenCache.get(userId) === accessToken;
    if (!isValidToken) {
        next(new Error('SOCKET.IO Authentication error: invalid accesstoken'));
    }
    global_config_1.SocketIDCache.set(userId, socket.id, 86400);
    next();
};
exports.AuthorizationSocketIO = AuthorizationSocketIO;
