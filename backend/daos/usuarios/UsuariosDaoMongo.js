const ContenedorMongo = require("../../containers/ContenedorMongo");

class UsuariosDaoMongo extends ContenedorMongo {
  constructor() {
    super("usuarios", {
      email: { type: String, required: true },
      password: { type: String, required: true },
      nombre: { type: String, required: true },
      direccion: { type: String, required: true },
      edad: { type: Number, required: true },
      telefono: { type: String, required: true },
      avatar: { type: String, required: true },
      carritoId: { type: String, required: true },
    });
  }
}

module.exports = UsuariosDaoMongo;
