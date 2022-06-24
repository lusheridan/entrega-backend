const ContenedorMongo = require("../../containers/ContenedorMongo");

class CarritosDaoMongo extends ContenedorMongo {
  constructor() {
    super("carritos", {
      timestamp: { type: String, required: true },
      productos: { type: Array, required: true },
    });
  }
}

module.exports = CarritosDaoMongo;
