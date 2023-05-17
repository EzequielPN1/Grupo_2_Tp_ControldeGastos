import ConeccionSqlite from './coneccionSqlite.js'


class usuarioSqlite {

  constructor() {
    this.bd = new ConeccionSqlite().coneccion
  }


  registro = (email, nombre, pass) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO usuarios (email, nombre, pass) VALUES (?, ?, ?)`;
      this.bd.run(sql, [email, nombre, pass], function (err) {
        if (err) {
          console.log(err);
          reject("Error al registrar usuario");
        } else {
          resolve("Usuario registrado correctamente");
        }
      });
    });
  };


  login = (email) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM usuarios WHERE email = ?`;
      this.bd.get(sql, [email], (err, row) => {
        if (err) {
          console.log(err);
          reject("Error mail no registrado");
        } else {
          resolve(row);
        }
      });
    });
  };



  editarUsuario = (email, nombre) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE usuarios SET nombre = ? WHERE email = ?`;
      this.bd.run(sql, [nombre, email], (err) => {
        if (err) {
          console.log(err);
          reject("Error usuario no encontrado");
        } else {
          this.bd.get(`SELECT * FROM usuarios WHERE email = ?`, [email], (err, row) => {
            if (err) {
              console.log(err);
              reject("Error en la edicion del usuario");
            } else {
              resolve(row);
            }
          });
        }
      });
    });
  };




  confirmarRegistro = (email) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE usuarios SET registro = 1 WHERE email = ?`;
      this.bd.run(sql, [email], function (err) {
        if (err) {
          console.log(err);
          reject("Error en la confirmación");
        } else {
          resolve();
        }
      });
    });
  };



  cambiarContrasenia = (email, nuevaPass) => {
    return new Promise((resolve, reject) => {
      const checkEmailSQL = 'SELECT COUNT(*) as count FROM usuarios WHERE email = ?';
      this.bd.get(checkEmailSQL, [email], (err, row) => {
        if (row.count === 0) {
          reject("El correo electrónico no está registrado");
        } else {
          const updatePasswordSQL = 'UPDATE usuarios SET pass = ? WHERE email = ?';
          this.bd.run(updatePasswordSQL, [nuevaPass, email], function (err) {
            if (err) {
              console.log(err);
              reject("Error en el cambio de contraseña");
            } else {
              resolve();
            }
          });
        }
      });
    });
  };


}
export default usuarioSqlite