module.exports = app => {
    const departamento = require("../controllers/departamento.controller.js");
    var router = require("express").Router();

    // Crear un nuevo Departamento
    router.post("/", departamento.create);

    // Obtener todos los Departamentos
    router.get("/", departamento.findAll);

    // Obtener Departamentos por estado activo
    router.get("/status", departamento.findAllStatus);

    // Obtener un Departamento por ID
    router.get("/:id", departamento.findOne);

    // Actualizar un Departamento por ID
    router.put("/:id", departamento.update);

    // Eliminar un Departamento por ID
    router.delete("/:id", departamento.delete);

    // Eliminar todos los Departamentos
    router.delete("/", departamento.deleteAll);

    // Ruta base unificada en español
    app.use("/api/departamentos", router);
};