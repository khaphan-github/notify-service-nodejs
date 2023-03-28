import dotenv from 'dotenv';

dotenv.config();

export const ServerConfig = {
  MONGO_URI: process.env.MOGODB_URI || '',
  MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME || 'test',
  
  REDIS_URI: process.env.REDIS_URI || '',

  SERVER_HOST: process.env.SERVER_HOST || 3000,

  ORIGIN_URI: process.env.ORIGIN_URI || 'http://localhost:3000'
}
