const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');

// Generar token JWT
const generateToken = (userId, email) => {
  return jwt.sign(
    { id: userId, email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const authController = {
  // Registrar nuevo usuario
  register: async (req, res) => {
    try {
      const { nombre, email, password } = req.body;

      // Validaciones básicas
      if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }
      
      if (password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
      }

      // Verificar si el usuario ya existe
      const usuarioExistente = await Usuario.findByEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }

      // Crear usuario
      const nuevoUsuario = await Usuario.create({ nombre, email, password });

      // Generar token
      const token = generateToken(nuevoUsuario.id, nuevoUsuario.email);

      // Responder
      res.status(201).json({
        message: '✅ Usuario registrado exitosamente',
        usuario: nuevoUsuario,
        token
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  },

  // Iniciar sesión
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validaciones
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }

      // Buscar usuario por email
      const usuario = await Usuario.findByEmail(email);
      if (!usuario) {
        return res.status(401).json({ error: 'Email o contraseña incorrectos' });
      }

      // Verificar contraseña
      const passwordValida = await Usuario.comparePassword(password, usuario.password);
      if (!passwordValida) {
        return res.status(401).json({ error: 'Email o contraseña incorrectos' });
      }
      await Usuario.updateLastLogin(usuario.id);

      const token = generateToken(usuario.id, usuario.email);

      const { password: _, ...usuarioSinPassword } = usuario;
      res.json({
        message: ' Inicio de sesión exitoso',
        usuario: usuarioSinPassword,
        token
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  },

  getProfile: async (req, res) => {
    try {
      const usuario = await Usuario.findById(req.userId);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({ error: 'Error al obtener perfil' });
    }
  }
};

module.exports = authController;