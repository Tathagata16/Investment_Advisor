const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const healthRoutes = require("./routes/health.routes");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const analysisRoutes = require("./routes/analysis.routes");


const app = express();

//middlewares
app.use(cors());

app.use(express.json());

app.use(cookieParser());


//routes
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/analysis", analysisRoutes);


//errors
app.use(notFound);

app.use(errorHandler);

module.exports = app;