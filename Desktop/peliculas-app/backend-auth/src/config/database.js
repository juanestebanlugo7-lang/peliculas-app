const { Pool } = require('pg');
require('dotenv').config();

// Configuración de la conexión
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Probar la conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL:', err.stack);
  } else {
    console.log('✅ Conectado a PostgreSQL correctamente');
    console.log(`📊 Base de datos: ${process.env.DB_NAME}`);
    release();
  }
});

module.exports = pool;