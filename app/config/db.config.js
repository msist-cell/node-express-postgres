module.exports = {
  HOST: "ep-bitter-water-atg8ttd9-pooler.c-9.us-east-1.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_SIOavQ9T2sPx", // Sustituye esto por tu contraseña real de Neon
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};