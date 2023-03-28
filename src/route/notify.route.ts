import express from "express";
import { NotifyController, TokenController } from "../api/notify/controller/notity.controller";

const NotifyRoute = express.Router();

NotifyRoute.route('/api/v1/service/notify')
  .post(NotifyController)
  .put(TokenController);

export default NotifyRoute;