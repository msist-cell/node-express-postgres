const db = require("../models");
const Proveedor = db.proveedores;
const Op = db.Sequelize.Op;

// Crear un nuevo Proveedor
exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({ message: "El nombre no puede estar vacío!" });
        return;
    }

    const proveedor = {
        nombre: req.body.nombre,
        contacto: req.body.contacto,
        telefono: req.body.telefono,
        email: req.body.email,
        direccion: req.body.direccion,
        status: req.body.status ? req.body.status : true
    };

    Proveedor.create(proveedor)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el Proveedor."
            });
        });
};

// Obtener todos los Proveedores
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Proveedor.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener proveedores."
            });
        });
};

// Obtener un Proveedor por ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Proveedor.findByPk(id)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: "Error al obtener Proveedor con id=" + id });
        });
};

// Actualizar un Proveedor por ID
exports.update = (req, res) => {
    const id = req.params.id;

    Proveedor.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Proveedor actualizado correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar el Proveedor con id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar Proveedor con id=" + id });
        });
};

// Eliminar un Proveedor por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Proveedor.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Proveedor eliminado correctamente!" });
            } else {
                res.send({ message: `No se pudo eliminar el Proveedor con id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "No se pudo eliminar Proveedor con id=" + id });
        });
};

// Eliminar todos los Proveedores
exports.deleteAll = (req, res) => {
    Proveedor.destroy({ where: {}, truncate: false })
        .then(nums => res.send({ message: `${nums} Proveedores fueron eliminados correctamente!` }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar todos los proveedores."
            });
        });
};

// Obtener Proveedores activos
exports.findAllStatus = (req, res) => {
    Proveedor.findAll({ where: { status: true } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener proveedores activos."
            });
        });
};