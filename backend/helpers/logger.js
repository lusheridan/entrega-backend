const log4js = require("log4js");

log4js.configure({
  appenders: {
    logsConsole: { type: "console" },
    logsWarn: { type: "file", filename: "warn.log" },
    logsError: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["logsConsole"], level: "all" },
    console: { appenders: ["logsConsole"], level: "info" },
    warn: { appenders: ["logsWarn"], level: "warn" },
    error: { appenders: ["logsError"], level: "error" },
  },
});

const logConsole = log4js.getLogger("console");
const logWarn = log4js.getLogger("warn");
const logError = log4js.getLogger("error");

module.exports = { logConsole, logWarn, logError };
