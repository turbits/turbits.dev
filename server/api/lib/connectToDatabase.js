import mongoose from "mongoose";
const { NODE_ENV, DB_LOCAL_URI, DB_PROD_URI, DB_NAME } = process.env;
const PORT = process.env.PORT || 4000;

let databaseUrl = "";
let cached = global.mongoose;

if (NODE_ENV === "production") {
  databaseUrl = `${DB_PROD_URI}?retryWrites=true&w=majority`;
} else if (NODE_ENV === "development") {
  databaseUrl = `${DB_LOCAL_URI}:${PORT}/${DB_NAME}`;
} else {
  throw new Error("NODE_ENV not set");
}

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectToDatabase = async () => {
  if (cached.conn) {
    console.log(`🟦 cached connection found: ${cached.conn}`);
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

export default connectToDatabase;
