import { Server, Socket } from "socket.io";
import { SocketIDCache } from "../../../global.config";
import { NotifyRepository } from "../repository/notify.repository";

export const EmitMessageFirstTimeWhenConnected = (socket: Socket, server: Server): void => {
  const userId = socket.handshake.query.userId as string;
  let limitMessage = parseInt(socket.handshake.query.limitMessage as string);
  
  if(limitMessage < 1) limitMessage = 1;
  if(limitMessage > 20) limitMessage = 20;

  const connectionId: string = SocketIDCache.get(userId) as string;

  const notifyRepository: NotifyRepository = new NotifyRepository();

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
}

export const OnListenWhenClientEmit = (socket: Socket, server: Server): void => {
  socket.on('message', (messageFromClient: any) => {
    const userId = messageFromClient.userId;
    let page = messageFromClient.userId;
    let limit = messageFromClient.limit;

    if(page < 0) page = 0;
    
    if(limit < 1) limit = 1;
    if(limit > 20) limit = 20;

    const connectionId: string = SocketIDCache.get(userId) as string;
    const notifyRepository: NotifyRepository = new NotifyRepository();

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
}