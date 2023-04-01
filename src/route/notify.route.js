"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notity_controller_1 = require("../api/notify/controller/notity.controller");
const NotifyRoute = express_1.default.Router();
NotifyRoute.route('/api/v1/service/notify')
    .post(notity_controller_1.NotifyController)
    .put(notity_controller_1.TokenController);
exports.default = NotifyRoute;
