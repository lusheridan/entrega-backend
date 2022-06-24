const ContenedorMongo = require("../../containers/ContenedorMongo");

class ProductosDaoMongo extends ContenedorMongo {
  constructor() {
    super("productos", {
      timestamp: { type: String, required: true },
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      codigo: { type: String, required: false },
      url: { type: String, required: true },
      precio: { type: Number, required: true },
      stock: { type: Number, required: true },
    });
  }
}

module.exports = ProductosDaoMongo;
