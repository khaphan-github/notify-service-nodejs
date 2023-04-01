"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDatabaseGlobal = exports.TokenCache = exports.SocketIDCache = void 0;
const mongodb_config_1 = require("./lib/database/mongodb.config");
const memcache_service_1 = require("./lib/memcache/memcache.service");
// docker run --name norify-redis-db -p 6379:6379 -d redislabs/rejson:latest
// docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_name_or_id>
exports.SocketIDCache = new memcache_service_1.CacheService();
exports.TokenCache = new memcache_service_1.CacheService();
exports.MongoDatabaseGlobal = new mongodb_config_1.MongoDatabase();
