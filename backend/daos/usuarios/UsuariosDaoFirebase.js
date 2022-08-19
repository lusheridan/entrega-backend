const ContenedorFirebase = require("../../containers/ContenedorFirebase");

class UsuariosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("usuarios");
  }
}

module.exports = UsuariosDaoFirebase;
