const pool = require('../config/database');

class Lista {
  static async crearListasBase(usuario_id) {
    const tipos = ['favoritas', 'pendientes', 'vistas'];
    for (const tipo of tipos) {
      await pool.query(
        'INSERT INTO listas (usuario_id, nombre) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [usuario_id, tipo]
      );
    }
  }

  static async agregarPelicula(usuario_id, nombreLista, pelicula_id) {
    const listaRes = await pool.query(
      'SELECT id FROM listas WHERE usuario_id = $1 AND nombre = $2',
      [usuario_id, nombreLista]
    );
    if (listaRes.rows.length === 0) throw new Error(`Lista '${nombreLista}' no encontrada`);
    const lista_id = listaRes.rows[0].id;
    await pool.query(
      'INSERT INTO lista_peliculas (lista_id, pelicula_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [lista_id, pelicula_id]
    );
  }

  static async quitarPelicula(usuario_id, nombreLista, pelicula_id) {
    const listaRes = await pool.query(
      'SELECT id FROM listas WHERE usuario_id = $1 AND nombre = $2',
      [usuario_id, nombreLista]
    );
    if (listaRes.rows.length === 0) throw new Error(`Lista '${nombreLista}' no encontrada`);
    const lista_id = listaRes.rows[0].id;
    await pool.query(
      'DELETE FROM lista_peliculas WHERE lista_id = $1 AND pelicula_id = $2',
      [lista_id, pelicula_id]
    );
  }

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

  static async getPeliculasByLista(usuario_id, nombreLista) {
    const listaRes = await pool.query(
      'SELECT id FROM listas WHERE usuario_id = $1 AND nombre = $2',
      [usuario_id, nombreLista]
    );
    if (listaRes.rows.length === 0) return [];
    const lista_id = listaRes.rows[0].id;
    const result = await pool.query(
      'SELECT pelicula_id FROM lista_peliculas WHERE lista_id = $1',
      [lista_id]
    );
    return result.rows.map(row => row.pelicula_id);
  }
}

module.exports = Lista;