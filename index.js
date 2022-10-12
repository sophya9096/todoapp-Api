const express = require("express");
const path = require("path");

require("dotenv").config({
  path:
    process.env.NODE_ENV === "development"
      ? path.resolve(".env.development")
      : path.resolve(".env"),
});

const { connectDatabase } = require("./db");

const app = express();

const PORT = process.env.PORT || 5000;

connectDatabase();

app.use(express.json({ extended: false }));
app.use("/api/v1", require("./routes"));

app.use((req, res) => {
  res.status(404).json({
    sucess: "false",
    message: "api not found",
  });
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));

console.log(process.env.NODE_ENV);
