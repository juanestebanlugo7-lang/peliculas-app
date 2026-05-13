const Usuario = require('../models/usuario.model');
const Lista = require('../models/lista.model');
const jwt = require('jsonwebtoken');

const generateToken = (userId, email) => {
  return jwt.sign({ id: userId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const authController = {
  register: async (req, res) => {
    try {
      const { nombre, email, password } = req.body;
      if (!nombre || !email || password.length < 6) {
        return res.status(400).json({ error: 'Datos inválidos' });
      }
      const existe = await Usuario.findByEmail(email);
      if (existe) {
        return res.status(400).json({ error: 'Email ya registrado' });
      }
      const nuevoUsuario = await Usuario.create({ nombre, email, password });
      await Lista.crearListasBase(nuevoUsuario.id);
      const token = generateToken(nuevoUsuario.id, nuevoUsuario.email);
      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        usuario: nuevoUsuario,
        token
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña requeridos' });
      }
      const usuario = await Usuario.findByEmail(email);
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }
      const ok = await Usuario.comparePassword(password, usuario.password);
      if (!ok) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }
      await Usuario.updateLastLogin(usuario.id);
      const token = generateToken(usuario.id, usuario.email);
      const { password: _, ...user } = usuario;
      res.json({ message: 'Login exitoso', usuario: user, token });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  },

  getProfile: async (req, res) => {
    try {
      const usuario = await Usuario.findById(req.userId);
      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json(usuario);
    } catch (error) {
      console.error('Error en perfil:', error);
      res.status(500).json({ error: 'Error al obtener perfil' });
    }
  }
};

module.exports = authController;