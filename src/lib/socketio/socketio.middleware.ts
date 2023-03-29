import { Socket } from 'socket.io';
import { SocketIDCache, TokenCache } from '../../global.config';

export const AuthorizationSocketIO = (socket: Socket, next: any): void => {
  const accessToken = socket.handshake.auth.accesstoken;
  if (!accessToken) {
    next(new Error('SOCKET.IO Authentication error: missing accesstoken'));
  }

  const userId = socket.handshake.query.userId as string;
  if (!userId) {
    next(new Error('SOCKET.IO Authentication error: missing userId'));
  }

  const isValidToken: boolean = TokenCache.get(userId) === accessToken;
  if (!isValidToken) {
    next(new Error('SOCKET.IO Authentication error: invalid accesstoken'));
  }

  SocketIDCache.set(userId, socket.id, 86400);

  next();
}

