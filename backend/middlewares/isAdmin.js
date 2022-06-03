const admin = true;

function isAdmin(req, res, next) {
  if (!admin) {
    res.send("Error 401. No tenés autorización :(", 401);
  } else {
    next();
  }
}

module.exports = isAdmin;
