const dotenv = require("dotenv");
const { logError } = require("../helpers/logger.js");
dotenv.config();

let productosDaoInstance;
let carritosDaoInstance;
let usuariosDaoInstance;

const productosDao = function () {
  if (!productosDaoInstance) {
    switch (process.env.DB_NAME) {
      case "mongoDB":
        const ProductosDaoMongo = require("./productos/ProductosDaoMongo.js");
        productosDaoInstance = new ProductosDaoMongo();
        break;
      case "file":
        const ProductosDaoFile = require("../containers/ContenedorFile");
        productosDaoInstance = new ProductosDaoFile("productos.json");
        break;
      case "firebase":
        const ProductosDaoFirebase = require("./productos/ProductosDaoFirebase");
        productosDaoInstance = new ProductosDaoFirebase();
        break;
      default:
        logError.error("Base de datos no especificada", error);
        break;
    }
  }
  return productosDaoInstance;
};

const carritosDao = function () {
  if (!carritosDaoInstance) {
    switch (process.env.DB_NAME) {
      case "mongoDB":
        const CarritosDaoMongo = require("./carritos/CarritosDaoMongo.js");
        carritosDaoInstance = new CarritosDaoMongo();
        break;
      case "file":
        const CarritosDaoFile = require("../containers/ContenedorFile");
        carritosDaoInstance = new CarritosDaoFile("carrito.json");
        break;
      case "firebase":
        const CarritosDaoFirebase = require("./carritos/CarritosDaoFirebase");
        carritosDaoInstance = new CarritosDaoFirebase();
        break;
      default:
        logError.error("Base de datos no especificada", error);
        break;
    }
  }

  return carritosDaoInstance;
};

const usuariosDao = function () {
  if (!usuariosDaoInstance) {
    switch (process.env.DB_NAME) {
      case "mongoDB":
        const UsuariosDaoMongo = require("./usuarios/UsuariosDaoMongo.js");
        usuariosDaoInstance = new UsuariosDaoMongo();
        break;
      case "file":
        const UsuariosDaoFile = require("../containers/ContenedorFile");
        usuariosDaoInstance = new UsuariosDaoFile("carrito.json");
        break;
      case "firebase":
        const UsuariosDaoFirebase = require("./usuarios/UsuariosDaoFirebase");
        usuariosDaoInstance = new UsuariosDaoFirebase();
        break;
      default:
        logError.error("Base de datos no especificada", error);
        break;
    }
  }

  return usuariosDaoInstance;
};

module.exports = { productosDao, carritosDao, usuariosDao };
