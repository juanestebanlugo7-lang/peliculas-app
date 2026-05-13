const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require('./src/routes/auth.routes');
const movieRoutes = require('./src/routes/movie.routes');
const listaRoutes = require('./src/routes/lista.routes');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/listas', listaRoutes);
app.listen(process.env.PORT || 3000, () => console.log('Server running'));