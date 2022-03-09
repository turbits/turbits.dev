// IMPORTS
import express, { json } from "express";
import { serve, setup } from "swagger-ui-express";

import PostRouter from "./api/routes/posts.router.mjs";
import UserRouter from "./api/routes/users.router.mjs";
import cors from "cors";
import swagdoc from "swagger-jsdoc";
import titleAscii from "./titleAscii.mjs";

// SETUP
const app = express();
const PORT = process.env.PORT || 4000;
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

// MIDDLEWARE
app.use("/api", serve, setup(spec));
app.use(cors());
app.use(json());
app.use("/v1/posts", PostRouter);
app.use("/v1/users", UserRouter);

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
