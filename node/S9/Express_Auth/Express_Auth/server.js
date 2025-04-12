const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const PORT = 3000;

// import routes
const userRoutes = require("./routes/user.routes");
const jobRoutes = require("./routes/job.routes");
const authRoutes = require("./routes/auth.routes");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));

// Routes
server.use("/users", userRoutes);
server.use("/jobs", jobRoutes);
server.use("/auth", authRoutes);

server.get("/", (req, res) => {
  res.json({
    message: "Hello world !!!!",
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
