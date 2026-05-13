const pool = require('../config/database');

const userController = {
  // Obtener perfil público de un usuario por ID
  async getUserProfile(req, res) {
    try {
      const { id } = req.params;
      // Obtener datos básicos del usuario 
      const userQuery = await pool.query(
        'SELECT id, nombre, email, fecha_registro FROM usuarios WHERE id = $1',
        [id]
      );
      if (userQuery.rows.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener perfil de usuario' });
    }
  }
};

module.exports = userController;