module.exports = app => {
    const productos = require("../controllers/producto.controller.js");
    var router = require("express").Router();

    // Crear un nuevo Producto
    router.post("/", productos.create);

    // Obtener todos los Productos
    router.get("/", productos.findAll);

    // Obtener Productos por estado activo (opcional)
    router.get("/status", productos.findAllStatus);

    // Obtener un Producto por ID
    router.get("/:id", productos.findOne);

    // Actualizar un Producto por ID
    router.put("/:id", productos.update);

    // Eliminar un Producto por ID
    router.delete("/:id", productos.delete);

    // Eliminar todos los Productos (opcional)
    router.delete("/", productos.deleteAll);

    // Ruta base unificada en español
    app.use("/api/productos", router);
};