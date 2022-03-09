import "dotenv/config";

import mongoose from "mongoose";

// SETUP
const { NODE_ENV, DB_LOCAL_URI, DB_PROD_URI } = process.env;
const PORT = process.env.PORT || 27017;
let dbUri = "";
let cached = global.mongoose;

if (NODE_ENV === "production") {
  dbUri = DB_PROD_URI;
} else if (NODE_ENV === "development") {
  dbUri = DB_LOCAL_URI;
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
