const { Router } = require("express");
const Contenedor = require("../contenedor");
const isAdmin = require("../middlewares/isAdmin");

const router = Router();
const contenedor = new Contenedor("./productos.json");

router.get("/:id?", async (req, res) => {
  if (req.params.id) {
    const producto = await contenedor.getById(parseInt(req.params.id));
    res.send(producto);
  } else {
    const productos = await contenedor.getAll();
    res.send(productos);
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await contenedor.deleteById(id);

  if (!result) {
    return res.json({ error: "producto no encontrado" }, 404);
  }

  res.json({ message: "producto borrado" });
});

router.put("/:id", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  const productos = await contenedor.editById(id, body);

  if (productos) {
    return res.json(productos);
  }

  res.json({ error: "producto no encontrado" }, 404);
});

router.post("/", isAdmin, async (req, res) => {
  const body = req.body;
  const { nombre, descripcion, codigo, url, precio, stock } = body;
  const nuevoProducto = await contenedor.save({
    timestamp: Date.now(),
    nombre,
    descripcion,
    codigo,
    url,
    precio,
    stock,
  });

  res.json(nuevoProducto);
});

module.exports = router;
