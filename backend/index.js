const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/index");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "/public"));

app.use("/api", router);
app.use("*", (req, res) => {
  return res.json(
    {
      error: -2,
      descripcion: `la ruta ${req.originalUrl} con método ${req.method} no implementada`,
    },
    404
  );
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on("error", (error) => console.log("Server error", error));
