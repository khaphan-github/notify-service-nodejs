"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDatabase = void 0;
const env_config_1 = require("../../env/env.config");
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDatabase {
    connect() {
        const uri = env_config_1.ServerConfig.MONGO_URI + env_config_1.ServerConfig.MONGODB_DATABASE_NAME;
        mongoose_1.default
            .connect(uri, { retryWrites: true, w: 'majority' })
            .then(() => {
            console.log('Database connection successful');
        })
            .catch((err) => {
            console.error('Database connection error');
        });
    }
}
exports.MongoDatabase = MongoDatabase;
