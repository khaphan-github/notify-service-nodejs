import NodeCache from 'node-cache';

export class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 86400 }); // Default 1 day
  }

  public get(key: string) {
    return this.cache.get(key);
  }

  public set(key: string, value: any, ttl: number) {
    this.cache.set(key, value, ttl);
  }

  public del(key: string) {
    this.cache.del(key);
  }
}
