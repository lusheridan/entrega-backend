const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/index");
const cors = require("cors");
const passport = require("passport");
const local = require("./passport/local");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { logConsole, logError } = require("./helpers/logger");
const os = require("os");
const cluster = require("cluster");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const argv = yargs(hideBin(process.argv)).argv;
const cpus = os.cpus().length;
const modo = ["FORK", "CLUSTER"].includes ? argv.modo : "FORK";
const isCluster = modo === "CLUSTER";

if (isCluster && cluster.isMaster) {
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", express.static(__dirname + "/public"));
  app.set("view engine", "pug");
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hugyzbs.mongodb.net/ecommerce?retryWrites=true&w=majority`,
      }),
      secret: "asdfasdf",
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 3_600_000,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", router);
  app.use("*", (req, res) => {
    res.render(`${__dirname}/views/404.pug`, {
      route: req.originalUrl,
      method: req.method,
    });
  });

  const server = app.listen(PORT, () => {
    logConsole.info(`Server listening on port ${PORT}`);
  });

  server.on("error", (error) => logError.error("Server error", error));
}
