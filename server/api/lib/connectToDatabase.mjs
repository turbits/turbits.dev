import "dotenv/config";

import mongoose from "mongoose";

// SETUP
const { NODE_ENV, DB_LOCAL_URI, DB_PROD_URI } = process.env;
const PORT = process.env.PORT || 27017;
let databaseUrl = "";
let cached = global.mongoose;

if (NODE_ENV === "production") {
  databaseUrl = `${DB_PROD_URI}?retryWrites=true&w=majority`;
} else if (NODE_ENV === "development") {
  databaseUrl = DB_LOCAL_URI;
} else {
  throw new Error("NODE_ENV not set");
}

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
    };

    cached.promise = mongoose.connect(databaseUrl, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
