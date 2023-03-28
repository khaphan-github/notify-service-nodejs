import express from "express";
import { NotifyController, RefreshTokenController } from "../api/notify/controller/notity.controller";

const NotifyRoute = express.Router();

NotifyRoute.post('/api/v1/service/notify', NotifyController);
NotifyRoute.put('/api/v1/service/notify', RefreshTokenController);

export default NotifyRoute;