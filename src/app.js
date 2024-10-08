const createError = require("http-errors");
const express = require("express");
const path = require("node:path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load(path.join(__dirname, "../docs/swagger.yaml"));

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// Import routes
const userRoutes = require("./routers/api/v1/userRoutes");
const accountRoutes = require("./routers/api/v1/accountRoutes");
const transactionRoutes = require("./routers/api/v1/transactionRoutes");
const authRoutes = require("./routers/api/v1/authRoutes");

// manggil routes
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", accountRoutes);
app.use("/api/v1/", transactionRoutes);
app.use("/api/v1/auth", authRoutes);

// manggil swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

// // start server
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
