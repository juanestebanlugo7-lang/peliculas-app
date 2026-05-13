const pool = require('../config/database');
const bcrypt = require('bcrypt');

class Usuario {
  static async create({ nombre, email, password }) {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email, fecha_registro',
      [nombre, email, hashed]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT id, nombre, email, fecha_registro FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async updateLastLogin(id) {
    await pool.query('UPDATE usuarios SET ultimo_login = CURRENT_TIMESTAMP WHERE id = $1', [id]);
  }

  static async comparePassword(plain, hashed) {
    return bcrypt.compare(plain, hashed);
  }
}

module.exports = Usuario;