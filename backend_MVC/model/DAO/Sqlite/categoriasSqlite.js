import ConexionSqlite from './conexionSqlite.js'

class CategoriaSqlite {

  constructor() {
    this.db = ConexionSqlite.conexion
  }

  agregar = async (categoria) => {
    try {
      const {email, nombre, presupuesto} = categoria
      const sql = `INSERT INTO categorias (email, nombre, presupuesto) VALUES (?, ?, ?)`;
      await ConexionSqlite.runQuery(sql, [email, nombre, presupuesto])
      return "Categoria registrada correctamente";
    }
    catch (error) {
      console.log(error);
      throw new Error("Error al agregar categoria: " + error.message);
    }

  };
  
  editar = async (id, categoria) => {

    try {
      const {email, nombre, presupuesto} = categoria
      const sql = `UPDATE categorias SET email = ?, nombre = ?, presupuesto = ? WHERE id = ?`;
      await ConexionSqlite.runQuery(sql, [email, nombre, presupuesto, id])
      return "Categoria editada correctamente"
    }
    catch (error) {
      console.log(error)
      throw new Error("Error al editar categoria: " + error.message)
    }

  };
  
  eliminar = async id => {

    try {
      const sql = `DELETE FROM categorias WHERE id = ?`
      await ConexionSqlite.runQuery(sql, [id])
      return "Categoria eliminada correctamente"
    }
    catch (error) {
      console.log(error)
      throw new Error("Error al eliminar categoria: " + error.message)
    }

  };
  
  listar = async email => {

    try {
      const sql = `SELECT * FROM categorias WHERE email = ?`
      const row = await ConexionSqlite.getAllRows(sql, [email])
      return row 
    }
    catch (error) {
      console.log(error);
      throw new Error("Error al listar categorias: " + error.message);
    }

  };

}

export default CategoriaSqlite