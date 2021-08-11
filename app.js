const express = require("express");

const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
// const messageRoutes = require("./routes/messageRoute");
const itemRoutes = require("./routes/itemRoute");

const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(authRoutes);
app.use(userRoutes);
app.use("/items", itemRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
// app.use("/messages", messageRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.listen(8000);
