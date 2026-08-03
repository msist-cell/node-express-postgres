module.exports = app => {
    const clientes = require("../controllers/cliente.controller.js");
    var router = require("express").Router();

    // Crear un nuevo Cliente
    router.post("/", clientes.create);

    // Obtener todos los Clientes
    router.get("/", clientes.findAll);

    // Obtener Clientes por estado activo
    router.get("/status", clientes.findAllStatus);

    // Obtener un Cliente por ID
    router.get("/:id", clientes.findOne);

    // Actualizar un Cliente por ID
    router.put("/:id", clientes.update);

    // Eliminar un Cliente por ID
    router.delete("/:id", clientes.delete);

    // Eliminar todos los Clientes
    router.delete("/", clientes.deleteAll);

    // Ruta base unificada en español
    app.use("/api/clientes", router);
};