import { MongoDatabase } from "./lib/database/mongodb.config";
import { CacheService } from "./lib/memcache/memcache.service";

// docker run --name norify-redis-db -p 6379:6379 -d redislabs/rejson:latest
// docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_name_or_id>

export const SocketIDCache = new CacheService();
export const TokenCache = new CacheService();
export const MongoDatabaseGlobal = new MongoDatabase();
