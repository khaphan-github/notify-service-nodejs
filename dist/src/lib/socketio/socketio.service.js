"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIOService = void 0;
const socket_io_1 = require("socket.io");
const notify_service_1 = require("../../api/notify/service/notify.service");
const env_config_1 = require("../../env/env.config");
const socketio_middleware_1 = require("./socketio.middleware");
class SocketIOService {
    constructor(httpServer) {
        this.io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: env_config_1.ServerConfig.ORIGIN_URI,
                allowedHeaders: ['Authorization'],
                credentials: true,
                methods: ['GET', 'POST']
            }
        });
        /**Configure middleware */
        this.io.use(socketio_middleware_1.AuthorizationSocketIO);
        /**Enable connection */
        this.io.on('connection', (socket) => {
            (0, notify_service_1.EmitMessageFirstTimeWhenConnected)(socket, this.io);
            (0, notify_service_1.OnListenWhenClientEmit)(socket, this.io);
        });
        /**Configure error */
        this.io.on('connect_error', () => {
            console.log('socketio connection error');
        });
    }
    emitMessageTo(connectionId, chanel, message) {
        this.io.to(connectionId).emit(chanel, message);
    }
    isClientConnected(connectionId) {
        const connectedSocket = this.io.sockets.sockets.get(connectionId);
        return !!connectedSocket;
    }
}
exports.SocketIOService = SocketIOService;
