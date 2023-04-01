"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnListenWhenClientEmit = exports.EmitMessageFirstTimeWhenConnected = void 0;
const global_config_1 = require("../../../global.config");
const notify_repository_1 = require("../repository/notify.repository");
const EmitMessageFirstTimeWhenConnected = (socket, server) => {
    const userId = socket.handshake.query.userId;
    let limitMessage = parseInt(socket.handshake.query.limitMessage);
    if (limitMessage < 1)
        limitMessage = 1;
    if (limitMessage > 20)
        limitMessage = 20;
    const connectionId = global_config_1.SocketIDCache.get(userId);
    const notifyRepository = new notify_repository_1.NotifyRepository();
    notifyRepository
        .getNotifyByUserId(userId, limitMessage, 0)
        .then((notify) => {
        if (notify) {
            server.to(connectionId).emit('message', notify);
        }
        else {
            server.to(connectionId).emit('message', {
                status: 'Empty',
                message: 'No notifications'
            });
        }
    });
};
exports.EmitMessageFirstTimeWhenConnected = EmitMessageFirstTimeWhenConnected;
const OnListenWhenClientEmit = (socket, server) => {
    socket.on('message', (messageFromClient) => {
        const userId = messageFromClient.userId;
        let page = messageFromClient.userId;
        let limit = messageFromClient.limit;
        if (page < 0)
            page = 0;
        if (limit < 1)
            limit = 1;
        if (limit > 20)
            limit = 20;
        const connectionId = global_config_1.SocketIDCache.get(userId);
        const notifyRepository = new notify_repository_1.NotifyRepository();
        notifyRepository
            .getNotifyByUserId(userId, limit, page)
            .then((notify) => {
            if (notify) {
                server.to(connectionId).emit('message', notify);
            }
            else {
                server.to(connectionId).emit('message', {
                    status: 'Empty',
                    message: 'No notifications'
                });
            }
        });
    });
};
exports.OnListenWhenClientEmit = OnListenWhenClientEmit;
