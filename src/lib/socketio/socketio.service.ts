import { Server } from 'socket.io';
import { AuthorizationSocketIO } from './socketio.middleware';

export class SocketIOService {
  public io: Server;

  constructor(httpServer: any) {
    this.io = new Server(httpServer,
      {
        cors:
        {
          origin: 'http://localhost:3000',
          allowedHeaders: ['Authorization'],
          credentials: true,
          methods: ['GET', 'POST']
        }
      });

    /**Configure middleware */
    this.io.use(AuthorizationSocketIO);

    /**Enable connection */
    this.io.on('connection', () => {
      console.log('socketio connection established');
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
