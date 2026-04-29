const pool = require('../config/database');

class Lista {
  // Crear las listas por defecto para un nuevo usuario (se llama desde auth.controller.js al registrarse)
  static async crearListasBase(usuario_id) {
    const tipos = ['favoritas', 'pendientes', 'vistas'];
    for (const tipo of tipos) {
      await pool.query(
        'INSERT INTO listas (usuario_id, nombre) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [usuario_id, tipo]
      );
    }
  }

  // Obtener todas las listas de un usuario
  static async getListasByUsuario(usuario_id) {
    const result = await pool.query(
      'SELECT id, nombre FROM listas WHERE usuario_id = $1',
      [usuario_id]
    );
    return result.rows;
  }

  // Obtener IDs de películas de una lista específica
  static async getPeliculasByLista(usuario_id, nombreLista) {
    const query = `
      SELECT lp.pelicula_id
      FROM lista_peliculas lp
      JOIN listas l ON lp.lista_id = l.id
      WHERE l.usuario_id = $1 AND l.nombre = $2
    `;
    const result = await pool.query(query, [usuario_id, nombreLista]);
    return result.rows.map(row => row.pelicula_id);
  }

  // Agregar película a una lista
  static async agregarPelicula(usuario_id, nombreLista, pelicula_id) {
    // Obtener id de la lista
    const listaRes = await pool.query(
      'SELECT id FROM listas WHERE usuario_id = $1 AND nombre = $2',
      [usuario_id, nombreLista]
    );
    if (listaRes.rows.length === 0) return false;
    const lista_id = listaRes.rows[0].id;
    await pool.query(
      'INSERT INTO lista_peliculas (lista_id, pelicula_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [lista_id, pelicula_id]
    );
    return true;
  }

  // Quitar película de una lista
  static async quitarPelicula(usuario_id, nombreLista, pelicula_id) {
    const listaRes = await pool.query(
      'SELECT id FROM listas WHERE usuario_id = $1 AND nombre = $2',
      [usuario_id, nombreLista]
    );
    if (listaRes.rows.length === 0) return false;
    const lista_id = listaRes.rows[0].id;
    await pool.query(
      'DELETE FROM lista_peliculas WHERE lista_id = $1 AND pelicula_id = $2',
      [lista_id, pelicula_id]
    );
    return true;
  }

  // Verificar si una película está en una lista
  static async verificarEnLista(usuario_id, nombreLista, pelicula_id) {
    const listaRes = await pool.query(
      'SELECT id FROM listas WHERE usuario_id = $1 AND nombre = $2',
      [usuario_id, nombreLista]
    );
    if (listaRes.rows.length === 0) return false;
    const lista_id = listaRes.rows[0].id;
    const result = await pool.query(
      'SELECT id FROM lista_peliculas WHERE lista_id = $1 AND pelicula_id = $2',
      [lista_id, pelicula_id]
    );
    return result.rows.length > 0;
  }
}

module.exports = Lista;