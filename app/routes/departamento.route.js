module.exports = app => {
    const departamento = require("../controllers/departamento.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", departamento.create);
    // Retrieve all Client
    router.get("/", departamento.findAll);
    // Retrieve all published Client
    router.get("/status", departamento.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", departamento.findOne);
    // Update a Client with id
    router.put("/update/:id", departamento.update);
    // Delete a Client with id
    router.delete("/delete/:id", departamento.delete);
    // Delete all Cliente
    router.delete("/delete/", departamento.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/customer", router);
};