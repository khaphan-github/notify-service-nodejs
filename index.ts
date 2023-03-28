import express from "express";
import { SocketIOService } from "./src/lib/socketio/socketio.service";
import http from 'http';
import NotifyRoute from "./src/route/notify.route";
import bodyParser from "body-parser";
import { MongoDatabaseGlobal } from "./src/global.config";

/** SERVER CONFIGURATION */
const appExpress = express();
const httpServer = new http.Server(appExpress);

/** BODY PARSER CONFIGURATION */
appExpress.use(bodyParser.json());
appExpress.use(bodyParser.urlencoded({ extended: true }));

/** ROUTE CONFIGURATION */
appExpress.use(NotifyRoute);

/** SOCKETIO CONFIGURATION */
export const SocketIO = new SocketIOService(httpServer);

MongoDatabaseGlobal.connect();
/** START SERVER */
httpServer.listen(3001, function () {
    console.log("listening on *:3001");
});