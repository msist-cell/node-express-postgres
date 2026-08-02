module.exports = (sequelize, Sequelize) => {
  const Empleado = sequelize.define("empleado", {
    nombre: {
      type: Sequelize.STRING
    },
    apellido: {
      type: Sequelize.STRING     
    },
    direccion: {
      type: Sequelize.STRING
    },
    correo: {
      type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.STRING
    },
  });

  return Empleado;
};
