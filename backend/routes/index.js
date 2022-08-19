const { Router } = require("express");
const productosRoutes = require("./productos");
const carritoRoutes = require("./carrito");
const authRoutes = require("./auth");
const ordenesRoutes = require("./ordenes");

const router = Router();

router.use("/productos", productosRoutes);
router.use("/carrito", carritoRoutes);
router.use("/auth", authRoutes);
router.use("/ordenes", ordenesRoutes);

module.exports = router;
