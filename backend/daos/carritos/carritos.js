const ContenedorMongo = require("ContenedorMongo.js");

class Carritos extends ContenedorMongo {
  constructor() {
    super("carritos", {
      productos: { type: Array },
    });
  }
}

module.exports = Carritos;
