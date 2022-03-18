import { ConnectToDatabase } from "./ConnectToDatabase.mjs";
import GetDatabaseUri from "./GetDatabaseUri.mjs";
import MongoStore from "connect-mongo";
import session from "express-session";

const GetSessionStore = async () => {
  const client = await ConnectToDatabase();
  const dbUri = await GetDatabaseUri();

  return new MongoStore({
    mongoUrl: dbUri,
    clientPromise: client,
    collectionName: "sessions",
  });
};

export default GetSessionStore;
