const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());                    // Permite peticiones del frontend
app.use(express.json());            // Para leer JSON
app.use(express.urlencoded({ extended: true })); // Para formularios

// Ruta de prueba (para verificar que funciona)
app.get('/api/test', (req, res) => {
  res.json({ 
    message: '🚀 Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Importar rutas de autenticación
const authRoutes = require('./src/routes/auth.routes');

// Usar rutas
app.use('/api/auth', authRoutes);

// Manejo de errores (siempre al final)
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: err.message 
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Endpoints disponibles:`);
  console.log(`   GET  /api/test           - Probar servidor`);
  console.log(`   POST /api/auth/register  - Registrar usuario`);
  console.log(`   POST /api/auth/login     - Iniciar sesión`);
  console.log(`   GET  /api/auth/profile   - Obtener perfil (requiere token)`);
});