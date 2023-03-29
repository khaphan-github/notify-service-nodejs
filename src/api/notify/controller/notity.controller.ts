import { Request, Response, NextFunction } from 'express';
import { SocketIO } from '../../../..';
import { SocketIDCache, TokenCache } from '../../../global.config';
import { NotifyDTO } from '../dto/notify.dto';
import { Token } from '../dto/token.dto';
import { NotifyRepository } from '../repository/notify.repository';

const notifyRepository: NotifyRepository = new NotifyRepository();

export const NotifyController = async (req: Request, res: Response, next: NextFunction) => {

  const MessageRequest: NotifyDTO = {
    UserId: req.body.UserId,
    Message: req.body.Message,
  };

  notifyRepository
    .saveNotify(MessageRequest)
    .then((savedNotify: any) => {

      const socketClientConnection: string = SocketIDCache.get(MessageRequest.UserId) as string;
      const isUserOnline: boolean = SocketIO.isClientConnected(socketClientConnection);

      if (isUserOnline) {
        SocketIO.emitMessageTo(socketClientConnection, 'message', savedNotify);
      }

    })
    .catch((error: any) => {
      console.error(error);
    });

  res.status(201).json({
    'Status': 'Service recieved message',
  }).end();
}

export const TokenController = (req: Request, res: Response, next: NextFunction) => {
  
  const MessageRequest: Token = {
    UserId: req.body.UserId,
    AccessToken: req.body.AccessToken,
  };

  TokenCache.set(MessageRequest.UserId, MessageRequest.AccessToken, 86400);

  res.status(201).json({
    'Status': 'Update token success',
  }).end();
}