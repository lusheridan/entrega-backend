const {productosDao, usuariosDao, carritosDao} = require("./");

class Factory {
  static get(type) {
    switch (type) {
      case "carrito":
        return carritosDao();
      case "producto":
        return productosDao();
      case "usuario":
        return usuariosDao();
    }
  }
}

module.exports = Factory;
