import { Server, Socket } from 'socket.io';
import { EmitMessageFirstTimeWhenConnected, OnListenWhenClientEmit } from '../../api/notify/service/notify.service';
import { ServerConfig } from '../../env/env.config';
import { AuthorizationSocketIO } from './socketio.middleware';

export class SocketIOService {
  public io: Server;

  constructor(httpServer: any) {
    this.io = new Server(httpServer,
      {
        cors:
        {
          origin: ServerConfig.ORIGIN_URI,
          allowedHeaders: ['Authorization'],
          credentials: true,
          methods: ['GET', 'POST']
        }
      });

    /**Configure middleware */
    this.io.use(AuthorizationSocketIO);

    /**Enable connection */
    this.io.on('connection', (socket: Socket) => {
      EmitMessageFirstTimeWhenConnected(socket, this.io);
      OnListenWhenClientEmit(socket, this.io);
    });

    /**Configure error */
    this.io.on('connect_error', () => {
      console.log('socketio connection error');
    });
  }

  
  public emitMessageTo(connectionId: string, chanel: string, message: string) {
    this.io.to(connectionId).emit(chanel, message);
  }

  public isClientConnected(connectionId: string) {
    const connectedSocket = this.io.sockets.sockets.get(connectionId);
    return !!connectedSocket;
  }
}
