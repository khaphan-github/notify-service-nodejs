"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
class CacheService {
    constructor() {
        this.cache = new node_cache_1.default({ stdTTL: 86400 }); // Default 1 day
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, value, ttl) {
        this.cache.set(key, value, ttl);
    }
    del(key) {
        this.cache.del(key);
    }
}
exports.CacheService = CacheService;
