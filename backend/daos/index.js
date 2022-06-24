const dotenv = require("dotenv");
dotenv.config();

let productosDaoInstance;
let carritosDaoInstance;

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
        console.log("Base de datos no especificada");
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
        console.log("Base de datos no especificada");
        break;
    }
  }

  return carritosDaoInstance;
};

module.exports = { productosDao, carritosDao };
