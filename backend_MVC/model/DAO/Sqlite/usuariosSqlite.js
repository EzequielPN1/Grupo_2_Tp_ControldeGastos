import ConeccionSqlite from '../Sqlite/coneccionSqlite.js'


class usuarioSqlite {

  constructor() {
    this.bd = ConeccionSqlite.coneccion
  }


  registro = async (email, nombre, pass,apellido,fechaNac,dni) => {
    try {
      const insertSql = `INSERT INTO usuarios (email, nombre, pass,apellido,fecha_nacimiento,dni) VALUES (?, ?, ?, ?, ?, ? )`;
      await ConeccionSqlite.runQuery(insertSql, [email, nombre, pass,apellido,fechaNac,dni]);
      return "Usuario registrado correctamente";
    } catch (error) {
      if (error.includes("UNIQUE constraint failed: usuarios.email")) {
        throw new Error("Error, el correo " + email + " ya fue ingresado");
      } else {
        throw new Error("Error al registrar usuario: " + error);
      }
    }
  };


  login = async (email) => {
    try {
      const selectSql = `SELECT * FROM usuarios WHERE email = ?`;
      const row = await ConeccionSqlite.getRow(selectSql, [email]);
  
      if (!row) {
        throw new Error("El " + email + " no está registrado");
      }
  
      return row;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  




editarUsuario = async (email, nombre) => {
  try {
    const updateSql = `UPDATE usuarios SET nombre = ? WHERE email = ?`;
    await ConeccionSqlite.runQuery(updateSql, [nombre, email]);

    const selectSql = `SELECT * FROM usuarios WHERE email = ?`;
    const row = await ConeccionSqlite.getRow(selectSql, [email]);

    return row;
  } catch (error) {
    console.log(error);
    throw new Error("Error al editar al usuario: " + error.message);
  }
};



confirmarRegistro = async (email) => {
  try {
    const updateSql = `UPDATE usuarios SET registro = 1 WHERE email = ?`;
    await ConeccionSqlite.runQuery(updateSql, [email]);
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Error en la confirmación");
  }
};



cambiarContrasenia = async (email, nuevaPass) => {
  try {
    const checkEmailSQL = 'SELECT COUNT(*) as count FROM usuarios WHERE email = ?';
    const emailCount = await ConeccionSqlite.getRow(checkEmailSQL, [email]);

    if (emailCount.count != 0) {
      const updatePasswordSQL = 'UPDATE usuarios SET pass = ? WHERE email = ?';
      await ConeccionSqlite.runQuery(updatePasswordSQL, [nuevaPass, email]);
    }
    return;
  } catch (error) {
    throw new Error(error);
  }
};



}
export default usuarioSqlite