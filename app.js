const express = require("express");
const stripe = require("stripe")(
  "pk_test_51JQYTnDsGZQiZyXQfbiKeQ0dCiqSOIpOI9fDoU4QGSdShU9sgYs1JyyuExmYFQIzWNLVV9nRPgl9NaCIsGCk7FTU00JzwEjZ8r"
);
require("dotenv").config();

const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const spaceImgRoute = require("./routes/spaceImgRoute");
const itemRoutes = require("./routes/itemRoute");
const stripeRoutes = require("./routes/stripeRoute");
const videoRoute = require("./routes/videoRoute")



const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.static("public"));

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(authRoutes);
app.use(userRoutes);
app.use(stripeRoutes);
app.use("/items", itemRoutes);
app.use("/images", spaceImgRoute);
app.use("/videos", videoRoute);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.listen(8000);
