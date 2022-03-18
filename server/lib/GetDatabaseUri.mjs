const { NODE_ENV, DB_PROD_URI, DB_LOCAL_URI } = process.env;

const GetDatabaseUri = async () => {
  if (NODE_ENV === "production") {
    return DB_PROD_URI;
  } else if (NODE_ENV === "development") {
    return DB_LOCAL_URI;
  } else {
    throw new Error("NODE_ENV not set");
  }
};

export default GetDatabaseUri;
