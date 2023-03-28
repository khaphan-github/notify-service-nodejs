import { Socket } from 'socket.io';
export const AuthorizationSocketIO = (socket: Socket, next: any): void => {
  const accessToken = socket.handshake.auth.accesstoken;
  if (!accessToken) {
    next(new Error('SOCKET.IO Authentication error: missing accesstoken'));
  }

  console.log(socket.handshake.query.userId);
  console.log(socket.id);

  // Storethem to cache
  // Verify token:
  next();
}