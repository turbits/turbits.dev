// IMPORTS
import express, { json, urlencoded } from "express";
import { serve, setup } from "swagger-ui-express";

import { ConnectToDatabase } from "./lib/ConnectToDatabase.mjs";
import GetLocalStratConfig from "./lib/config/passport.config.mjs";
import GetSessionStore from "./lib/GetSessionStore.mjs";
import PostRouter from "./api/routes/posts.router.mjs";
import SiteRouter from "./api/routes/sites.router.mjs";
import UserRouter from "./api/routes/users.router.mjs";
import cors from "cors";
import passport from "passport";
// import passportConfig from "passport";
import session from "express-session";
import swagdoc from "swagger-jsdoc";
import titleAscii from "./titleAscii.mjs";

// SETUP
const app = express();
const sessionStore = await GetSessionStore();
const PORT = process.env.PORT || 4000;
const { SESSION_SECRET } = process.env;
const _environment = app.get("env");
const spec = swagdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "KESSEL",
      version: "1.0.0",
      description: "A simple express API for turbits.dev",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
});
GetLocalStratConfig();

// MIDDLEWARE
app.use(passport.initialize());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// ROUTES
app.use("/api", serve, setup(spec));
app.use("/users", UserRouter);
app.use("/posts", PostRouter);
app.use("/", SiteRouter);

// START SERVER
app.listen(PORT, () => {
  console.log(titleAscii);
  console.log(
    `🟦 environment: ${
      _environment === "production" ? "🚀 production" : "🔧 development"
    }`
  );
  console.log(`🟩 server alive: http://localhost:${PORT}`);
  console.log(`🟩 swagger docs: http://localhost:${PORT}/api`);
});
