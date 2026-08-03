module.exports = app => {
    const proveedor = require("../controllers/proveedor.controller.js");
    var router = require("express").Router();

    // Crear un nuevo Proveedor
    router.post("/", proveedor.create);

    // Obtener todos los Proveedores
    router.get("/", proveedor.findAll);

    // Obtener Proveedores por estado activo
    router.get("/status", proveedor.findAllStatus);

    // Obtener un Proveedor por ID
    router.get("/:id", proveedor.findOne);

    // Actualizar un Proveedor por ID
    router.put("/:id", proveedor.update);

    // Eliminar un Proveedor por ID
    router.delete("/:id", proveedor.delete);

    // Eliminar todos los Proveedores
    router.delete("/", proveedor.deleteAll);

    // Ruta base unificada en español
    app.use("/api/proveedores", router);
};