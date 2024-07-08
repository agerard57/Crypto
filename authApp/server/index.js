const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const getRoutes = require("./src/routes/index");

require("dotenv").config();
const db = require("./src/config/db.config");
const port = require("./src/config/port.config");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.json());

// MongoDB Promise
const server = mongoose.connect(
  `mongodb+srv://${db.USER}:${db.PWD}@${db.DBNAME}.mongodb.net/?retryWrites=true&w=majority&appName=${db.TABLE}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.set("debug", true);

// Setup server to start listening
server.then(() => {
  app.listen(port, () => {
    console.info(`Server started on port ${port}`);
  });
});

// Error checker for mongoose
const co = mongoose.connection;
co.on("error", console.error.bind(console, "MongoDB connection error:"));

getRoutes(app);
