function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ message: "Usuario no autenticado" }, 401);
}

module.exports = isAuth;
