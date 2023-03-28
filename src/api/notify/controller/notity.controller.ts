import { Request, Response, NextFunction } from 'express';
import { SocketIO } from '../../../..';
import { CacheService } from '../../../lib/memcache/memcache.service';
import { NotifyDTO } from '../model/notify.dto';

export const NotifyController = (req: Request, res: Response, next: NextFunction) => {

  /**
   * LOGIC:
   * Everywhen other service call api notification
   * Socket io check connection to client:
   *  If online -> send notification
   *  If ofline -> save notification in cache
   * Every message with format json
   * 
   * Everywhen client online 
   *  Client connect to socket and get notifi from service
   *  Then Invalid cache.
   * 
   * Problems:
   * 1. What structure store in cache
   * 2. How security soketio
   * 
   * Some solutions for security:
   * - Store token then if token from socket client equal client recieve then authorize*/

  // Trường hợp khi user kết nôi - server không có thông báo
  // Trường hợp khi user không kết nối - server thông báo:
  // 
  const { uid } = req.params;

  const caches: CacheService = new CacheService();
  const notify: NotifyDTO = caches.get(uid) as NotifyDTO;

  if (!notify) {
    // Tạo 1 cái thông báo cho connection id này
    // 
  }
  if (notify && SocketIO.isClientConnected(notify.connectionId)) {

  }


  SocketIO.emitMessageTo('connectionid', 'message', req.body);

  res.status(200).json({
    'Satus': 'Send request to notification service successfully',
    'Data': req.body
  }).end();
}


export const RefreshTokenController = (req: Request, res: Response, next: NextFunction) => {

}