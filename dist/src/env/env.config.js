"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ServerConfig = {
    MONGO_URI: process.env.MOGODB_URI || '',
    MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME || 'test',
    REDIS_URI: process.env.REDIS_URI || '',
    SERVER_HOST: process.env.SERVER_HOST || 3000,
    ORIGIN_URI: process.env.ORIGIN_URI || 'http://localhost:3000'
};
