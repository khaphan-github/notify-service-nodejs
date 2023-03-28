import * as redis from 'redis';
import { promisify } from 'util';

export class RedisCache {
  private client;

  constructor(url: string) {
    this.client = redis.createClient({url: url});
    this.client.connect().then((connection) => {
      console.log(connection);
    }).catch((error) => {
      console.log(error);
    });
  }

  async setCacheByKeyAndValueAsync(key: string, value: string): Promise<void> {
    const setAsync = promisify(this.client.set).bind(this.client);
    await setAsync(key, value);
  }

  async getCacheByKeyAsync(key: string): Promise<string | null> {
    const getAsync = promisify(this.client.get).bind(this.client);
    const result = await getAsync(key);
    return result;
  }
}

