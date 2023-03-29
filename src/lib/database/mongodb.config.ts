import { ServerConfig } from "../../env/env.config";
import mongoose from 'mongoose';

export class MongoDatabase {
  connect() {
    const uri: string = ServerConfig.MONGO_URI + ServerConfig.MONGODB_DATABASE_NAME;
    mongoose
      .connect(uri, { retryWrites: true, w: 'majority' })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err: any) => {
        console.error('Database connection error');
      });
  }
}
