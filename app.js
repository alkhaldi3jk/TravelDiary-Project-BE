const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db/database");
const path = require("path");
const passport = require("passport");
connectDB();
const userRoutes = require("./apis/users/users.routes");
const profileRoutes = require("./apis/profiles/profile.routes");

const app = express();

// Middleware

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// Passport
const { localStrategy, jwtStrategy } = require("./middleware/passport");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

// Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routs
app.use("/api", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use(errorHandler);

app.listen(8005, () => {
  console.log("The application is running on localhost:8005");
});
