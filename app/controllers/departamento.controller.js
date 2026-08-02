const db = require("../models");
const Departamento = db.departamentos;
const Op = db.Sequelize.Op;

// Crear un nuevo Departamento
exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({ message: "El nombre no puede estar vacío!" });
        return;
    }

    const departamento = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        status: req.body.status ? req.body.status : true
    };

    Departamento.create(departamento)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el Departamento."
            });
        });
};

// Obtener todos los Departamentos
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Departamento.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener departamentos."
            });
        });
};

// Obtener un Departamento por ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Departamento.findByPk(id)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: "Error al obtener Departamento con id=" + id });
        });
};

// Actualizar un Departamento por ID
exports.update = (req, res) => {
    const id = req.params.id;

    Departamento.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Departamento actualizado correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar el Departamento con id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar Departamento con id=" + id });
        });
};

// Eliminar un Departamento por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Departamento.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Departamento eliminado correctamente!" });
            } else {
                res.send({ message: `No se pudo eliminar el Departamento con id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "No se pudo eliminar Departamento con id=" + id });
        });
};

// Eliminar todos los Departamentos
exports.deleteAll = (req, res) => {
    Departamento.destroy({ where: {}, truncate: false })
        .then(nums => res.send({ message: `${nums} Departamentos fueron eliminados correctamente!` }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar todos los departamentos."
            });
        });
};

// Obtener Departamentos activos
exports.findAllStatus = (req, res) => {
    Departamento.findAll({ where: { status: true } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener departamentos activos."
            });
        });
};