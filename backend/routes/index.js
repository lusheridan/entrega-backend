const { Router } = require("express");
const productosRoutes = require("./productos");
const carritoRoutes = require("./carrito");

const router = Router();

router.use("/productos", productosRoutes);
router.use("/carrito", carritoRoutes);

module.exports = router;
