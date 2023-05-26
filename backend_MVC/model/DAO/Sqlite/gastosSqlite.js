import ConexionSqlite from './conexionSqlite.js'

class GastoSqlite {

  constructor() {
    this.db = ConexionSqlite.conexion
  }

  agregar = async (gasto) => {

    try {
      const {email, titulo, monto, fecha, categoria, descripcion} = gasto
      const sql = `INSERT INTO gastos (email, titulo, monto, fecha, categoria, descripcion) VALUES (?, ?, ?, ?, ?, ?)`;
      await ConexionSqlite.runQuery(sql, [email, titulo, monto, fecha, categoria, descripcion])
      return "Gasto registrado correctamente";
    }
    catch (error) {
      console.log(error);
      throw new Error("Error al agregar gasto: " + error.message);
    }

  };
  
  editar = async (id, gasto) => {

    try {
      const {email, titulo, monto, fecha, categoria, descripcion} = gasto
      const sql = `UPDATE gastos SET email = ?, titulo = ?, monto = ?, fecha = ?, categoria = ?, descripcion = ? WHERE id = ?`;
      await ConexionSqlite.runQuery(sql, [email, titulo, monto, fecha, categoria, descripcion, id])
      return "Gasto editado correctamente"
    }
    catch (error) {
      console.log(error)
      throw new Error("Error al editar gasto: " + error.message)
    }

  };
  
  eliminar = async id => {

    try {
      const sql = `DELETE FROM gastos WHERE id = ?`
      await ConexionSqlite.runQuery(sql, [id])
      return "Gasto eliminado correctamente"
    }
    catch (error) {
      console.log(error)
      throw new Error("Error al eliminar gasto: " + error.message)
    }

  };
  
  listar = async email => {

    try {
      const sql = `SELECT * FROM gastos WHERE email = ?`
      const row = await ConexionSqlite.getAllRows(sql, [email])
      return row 
    }
    catch (error) {
      console.log(error);
      throw new Error("Error al listar gastos: " + error.message);
    }

  };

}

export default GastoSqlite