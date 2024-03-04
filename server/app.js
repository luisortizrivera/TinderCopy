const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const path = require("path");
const userRouter = require("./routes/user");
const userMatches = require("./routes/matches");
const userChats = require("./routes/chats");
const mongoose = require("mongoose");
const { url } = require("../config/databaseConfig");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
require("./configFiles/passport")(passport);

// #region Database connection
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));

// #endregion

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/user", userRouter);
app.use("/api/matches", userMatches);
app.use("/api/chats", userChats);

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:1234",
    changeOrigin: true,
  })
);

if (process.env.NODE_ENV.trim() === "production") {
  app.use(express.static(path.resolve("..", "client", "build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve("..", "client", "build", "index.html"))
  );
} else if (process.env.NODE_ENV.trim() === "development") {
  const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
}

app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});

module.exports = app;
