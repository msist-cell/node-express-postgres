module.exports = app => {
    const empleado = require("../controllers/empleado.controller.js");
    var router = require("express").Router();

    // Crear un nuevo Empleado
    router.post("/", empleado.create);

    // Obtener todos los Empleados
    router.get("/", empleado.findAll);

    // Obtener Empleados por estado activo
    router.get("/status", empleado.findAllStatus);

    // Obtener un Empleado por ID
    router.get("/:id", empleado.findOne);

    // Actualizar un Empleado por ID
    router.put("/:id", empleado.update);

    // Eliminar un Empleado por ID
    router.delete("/:id", empleado.delete);

    // Eliminar todos los Empleados
    router.delete("/", empleado.deleteAll);

    // Ruta base unificada en español
    app.use("/api/empleados", router);
};