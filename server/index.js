// IMPORTS
const express = require("express");
const swagui = require("swagger-ui-express");
const swagdoc = require("swagger-jsdoc");
const postsRouter = require("./api/routes/posts");
const usersRouter = require("./api/routes/users");
const cors = require("cors");

// SETUP
const app = express();
const PORT = process.env.PORT || 4000;
const _environment = app.get("env");
const spec = swagdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TDev API",
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
app.use("/api", swagui.serve, swagui.setup(spec));
app.use(cors());
app.use(express.json());
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// START SERVER
app.listen(PORT, () => {
  console.log(
    `🟦 environment: ${
      _environment === "production" ? "🚀 production" : "🔧 development"
    }`
  );
  console.log(`🟩 server alive: http://localhost:${PORT}`);
  console.log(`🟩 swagger docs: http://localhost:${PORT}/api`);
});
