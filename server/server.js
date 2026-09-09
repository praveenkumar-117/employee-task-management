require("dotenv").config();
const express = require("express");
const cors = require("cors");

const dbConect = require("./utils/db");
const authRouter = require("./router/auth-router");
const adminRouter = require("./router/admin-router");
const empRouter = require("./router/emp-router");
const errorsMiddleware = require("./middleware/errors-Middleware");
const loggingMiddleware = require("./middleware/logging-middleware");
const rateLimiter = require("./middleware/rate-limit-middleware");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(loggingMiddleware);
app.use(rateLimiter);

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/employee", empRouter);



const PORT = 7000;

dbConect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Is Listning At http://localhost/${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });

app.use(errorsMiddleware);
