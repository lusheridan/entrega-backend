const ContenedorFirebase = require("../../containers/ContenedorFirebase");

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }
}

module.exports = ProductosDaoFirebase;
