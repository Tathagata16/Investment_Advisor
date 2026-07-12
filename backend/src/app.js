const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const healthRoutes = require("./routes/health.routes");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const analysisRoutes = require("./routes/analysis.routes");
const companyRoutes = require("./routes/company.routes");


const app = express();

//middlewares
app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
));

app.use(express.json());

app.use(cookieParser());


//routes
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/analysis", analysisRoutes);
app.use("/api/v1/company", companyRoutes);


//errors
app.use(notFound);

app.use(errorHandler);

module.exports = app;