const express = require("express");
const app = express();

const userRouter = require('./routes/user');
const companyRoute = require('./routes/company');

const cookieParser = require("cookie-parser");
const cors = require("cors");
const DbConnect = require("./utils/db");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
DbConnect();
app.use(cors(corsOption));

app.use('/auth', userRouter);
app.use('/company', companyRoute);

module.exports = app;