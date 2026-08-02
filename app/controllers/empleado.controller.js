const db = require("../models");
const Empleado = db.empleados;
const Op = db.Sequelize.Op;

// Crear un nuevo Empleado
exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({ message: "El nombre no puede estar vacío!" });
        return;
    }

    const empleado = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        puesto: req.body.puesto,
        departamentoId: req.body.departamentoId,
        status: req.body.status ? req.body.status : true
    };

    Empleado.create(empleado)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el Empleado."
            });
        });
};

// Obtener todos los Empleados
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Empleado.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener los empleados."
            });
        });
};

// Obtener un Empleado por ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Empleado.findByPk(id)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: "Error al obtener Empleado con id=" + id });
        });
};

// Actualizar un Empleado por ID
exports.update = (req, res) => {
    const id = req.params.id;

    Empleado.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Empleado actualizado correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar el Empleado con id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar Empleado con id=" + id });
        });
};

// Eliminar un Empleado por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Empleado.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Empleado eliminado correctamente!" });
            } else {
                res.send({ message: `No se pudo eliminar el Empleado con id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "No se pudo eliminar Empleado con id=" + id });
        });
};

// Eliminar todos los Empleados
exports.deleteAll = (req, res) => {
    Empleado.destroy({ where: {}, truncate: false })
        .then(nums => res.send({ message: `${nums} Empleados fueron eliminados correctamente!` }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar todos los empleados."
            });
        });
};

// Obtener Empleados activos
exports.findAllStatus = (req, res) => {
    Empleado.findAll({ where: { status: true } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener empleados activos."
            });
        });
};