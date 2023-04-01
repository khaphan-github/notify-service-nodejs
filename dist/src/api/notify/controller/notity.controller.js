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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = exports.NotifyController = void 0;
const __1 = require("../../../..");
const global_config_1 = require("../../../global.config");
const notify_repository_1 = require("../repository/notify.repository");
const notifyRepository = new notify_repository_1.NotifyRepository();
const NotifyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const MessageRequest = {
        UserId: req.body.UserId,
        Message: req.body.Message,
    };
    notifyRepository
        .saveNotify(MessageRequest)
        .then((savedNotify) => {
        const socketClientConnection = global_config_1.SocketIDCache.get(MessageRequest.UserId);
        const isUserOnline = __1.SocketIO.isClientConnected(socketClientConnection);
        if (isUserOnline) {
            __1.SocketIO.emitMessageTo(socketClientConnection, 'message', savedNotify);
        }
    })
        .catch((error) => {
        console.error(error);
    });
    res.status(201).json({
        'Status': 'Service recieved message',
    }).end();
});
exports.NotifyController = NotifyController;
const TokenController = (req, res, next) => {
    const MessageRequest = {
        UserId: req.body.UserId,
        AccessToken: req.body.AccessToken,
    };
    global_config_1.TokenCache.set(MessageRequest.UserId, MessageRequest.AccessToken, 86400);
    res.status(201).json({
        'Status': 'Update token success',
    }).end();
};
exports.TokenController = TokenController;
