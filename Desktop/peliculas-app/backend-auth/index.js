const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const authRoutes = require('./src/routes/auth.routes');
const movieRoutes = require('./src/routes/movie.routes');
const listaRoutes = require('./src/routes/lista.routes');
app.use('/api/listas', listaRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
  console.log(` Endpoints:`);
  console.log(`   GET  /api/test           - Probar servidor`);
  console.log(`   POST /api/auth/register  - Registrar usuario`);
  console.log(`   POST /api/auth/login     - Iniciar sesión`);
  console.log(`   GET  /api/auth/profile   - Obtener perfil`);
  console.log(`   GET  /api/movies/popular - Películas populares`);
  console.log(`   GET  /api/movies/search  - Buscar películas`);
});