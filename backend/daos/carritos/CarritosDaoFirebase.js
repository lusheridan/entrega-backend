const ContenedorFirebase = require("../../containers/ContenedorFirebase");

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("carritos");
  }
}

module.exports = CarritosDaoFirebase;
