const express = require("express");
const morgan = require("morgan");
const path = require("path");
const viewRouter = require("./routes/viewRoutes")
const kurthiesRouter = require("./routes/kurthiRoutes")
const addProductsRouter = require("./routes/addProductsRouter")

const app = express();
app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//SET SECURITY HTTP
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/", viewRouter);
app.use("/addProduct", addProductsRouter)
app.use("/api/v1/kurthies", kurthiesRouter);

module.exports = app;


