const pool = require('../config/database');
const bcrypt = require('bcrypt');

class Usuario {
  // Crear nuevo usuario
  static async create({ nombre, email, password }) {
    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const query = `
      INSERT INTO usuarios (nombre, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, nombre, email, fecha_registro
    `;
    
    const result = await pool.query(query, [nombre, email, hashedPassword]);
    return result.rows[0];
  }

  // Buscar usuario por email
  static async findByEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  // Buscar usuario por ID
  static async findById(id) {
    const query = 'SELECT id, nombre, email, fecha_registro FROM usuarios WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Actualizar último login
  static async updateLastLogin(id) {
    const query = 'UPDATE usuarios SET ultimo_login = CURRENT_TIMESTAMP WHERE id = $1';
    await pool.query(query, [id]);
  }

  // Verificar contraseña
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = Usuario;