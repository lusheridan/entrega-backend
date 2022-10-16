const { Router } = require("express");
const router = Router();
const isAuth = require("../middlewares/isAuth");
const {
  whatsappNuevaVenta,
  mailNuevaVenta,
} = require("../helpers/notifications");
const Factory = require("../daos/Factory");
const short = require("short-uuid");
const carritosContainer = Factory.get("carrito");

router.post("/", isAuth, async (req, res) => {
  const { carritoId, telefono } = req.user;
  const carrito = await carritosContainer.getById(carritoId);

  if (carrito.productos.length === 0) {
    return res.json({ message: "El carrito no tiene productos" }, 400);
  }

  const orden = short.generate();

  await whatsappNuevaVenta({ telefono, orden });
  await mailNuevaVenta({
    orden,
    user: req.user,
    productos: carrito.productos,
  });
  await carritosContainer.editById(carrito._id, { productos: [] });
  res.json({ message: "success" });
});

module.exports = router;
