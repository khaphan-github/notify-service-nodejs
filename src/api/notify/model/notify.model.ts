import { CacheService } from "../../../lib/memcache/memcache.service";

export class NotifyModel {
  private userId: string = '';
  private accessToken: string = '';
  private connectionId: string = '';
  private data: any;

  private cache: CacheService = new CacheService();
  constructor(userId: string, accessToken: string, connectionId: string, data: any) {
    this.userId = userId;
    this.accessToken = accessToken;
    this.connectionId = connectionId;
    this.data = data;
  }

  public setToMemcache(): void {
    this.cache.set(this.userId, {
      userId: this.userId,
      accessToken: this.accessToken,
      connectionId: this.connectionId,
      data: this.data
    }, 86400);
  }
  
}