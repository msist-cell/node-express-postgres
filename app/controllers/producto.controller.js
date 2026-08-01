const db = require("../models");
const Producto = db.productos;

// Crear un nuevo producto
exports.create = (req, res) => {
  // Validar petición
  if (!req.body.nombre || req.body.precio === undefined) {
    res.status(400).send({
      message: "El nombre y el precio no pueden estar vacíos."
    });
    return;
  }

  // Crear objeto producto
  const producto = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    costo: req.body.costo || 0,
    stock: req.body.stock || 0
  };

  // Guardar en la base de datos
  Producto.create(producto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el producto."
      });
    });
};

// Obtener todos los productos
exports.findAll = (req, res) => {
  Producto.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener los productos."
      });
    });
};

// Obtener un solo producto por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Producto.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró el producto con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener el producto con id=" + id
      });
    });
};

// Actualizar un producto
exports.update = (req, res) => {
  const id = req.params.id;

  Producto.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num[0] === 1) {
        res.send({ message: "Producto actualizado correctamente." });
      } else {
        res.send({
          message: `No se pudo actualizar el producto con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el producto con id=" + id
      });
    });
};

// Eliminar un producto
exports.delete = (req, res) => {
  const id = req.params.id;

  Producto.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({ message: "Producto eliminado correctamente." });
      } else {
        res.send({
          message: `No se pudo eliminar el producto con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al eliminar el producto con id=" + id
      });
    });
};