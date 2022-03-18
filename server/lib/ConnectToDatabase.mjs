import "dotenv/config";

import GetDatabaseUri from "./GetDatabaseUri.mjs";
import mongoose from "mongoose";

// SETUP
const PORT = process.env.PORT || 27017;
let cached = global.mongoose;
let dbUri = await GetDatabaseUri();

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const ConnectToDatabase = async () => {
  if (cached.conn) {
    console.log(`🟦 cached connection found`);
    return cached.conn;
  }

  if (!cached.promise) {
    console.log(`🟦 no cached connection found, creating new connection`);
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(dbUri, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
