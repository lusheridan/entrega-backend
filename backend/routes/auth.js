const { Router } = require("express");
const passport = require("passport");
const { logError } = require("../helpers/logger");
const router = Router();

router.post("/register", passport.authenticate("register"), (req, res) => {
  res.json({ message: "success" });
});

router.post("/login", passport.authenticate("login"), (req, res) => {
  res.json({ message: "success" });
});

router.post("/logout", (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        logError.error("Error al destruir sesión", err);
      } else {
        res.json({ message: "success" });
      }
    });
  } catch (err) {
    logError.error("Error al destruir sesión", err);
  }
});

module.exports = router;
