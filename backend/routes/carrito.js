const { Router } = require("express");
const Contenedor = require("../contenedor");
const isAdmin = require("../middlewares/isAdmin");

const router = Router();
const contenedorCarrito = new Contenedor("./carrito.json");
const contenedorProductos = new Contenedor("./productos.json");

// id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
// const body = req.body;
// const { title, price, thumbnail } = body;

router.get("/:id/productos", async (req, res) => {
  const id = parseInt(req.params.id);
  const carrito = await contenedorCarrito.getById(id);
  if (!carrito) {
    return res.json({ error: `el carrito con id ${id} no existe` }, 404);
  }

  res.json(carrito.productos ?? []);
});

router.post("/", async (req, res) => {
  const nuevoCarrito = await contenedorCarrito.save({
    timestamp: Date.now(),
    productos: [],
  });

  res.json(nuevoCarrito);
});

router.post("/:id/productos", async (req, res) => {
  const id = parseInt(req.params.id);
  const carrito = await contenedorCarrito.getById(id);
  if (!carrito) {
    return res.json({ error: `el carrito con id ${id} no existe` }, 404);
  }

  const body = req.body;
  const { productId } = body;

  const producto = await contenedorProductos.getById(productId);
  if (!producto) {
    return res.json(
      { error: `el producto con id ${productId} no existe` },
      404
    );
  }

  carrito.productos.push(producto);

  const nuevoCarrito = await contenedorCarrito.editById(id, carrito);

  res.json(nuevoCarrito);
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
  const id = parseInt(req.params.id);
  const carrito = await contenedorCarrito.getById(id);
  if (!carrito) {
    return res.json({ error: `el carrito con id ${id} no existe` }, 404);
  }
  const idProducto = parseInt(req.params.id_prod);
  const index = carrito.productos.indexOf(
    carrito.productos.find((x) => x.id === idProducto)
  );

  if (index === -1) {
    return res.json({ error: "producto no encontrado" }, 404);
  }

  carrito.productos.splice(index, 1);
  const nuevoCarrito = await contenedorCarrito.editById(id, carrito);
  return res.json(nuevoCarrito);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await contenedorCarrito.deleteById(id);

  if (!result) {
    return res.json({ error: "carrito no encontrado" }, 404);
  }

  return res.json({ message: "carrito borrado" });
});

module.exports = router;
