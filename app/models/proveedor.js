module.exports = (sequelize, Sequelize) => {
  const Proveedor = sequelize.define("proveedor", {
    nombre: {
      type: Sequelize.STRING,
    },
    contacto: {
      type: Sequelize.DECIMAL(10, 2),
    },
    telefono: {
      type: Sequelize.DECIMAL(10, 2),
    },
    correo: {
      type: Sequelize.STRING,
    },
  });

  return Proveedor;
};