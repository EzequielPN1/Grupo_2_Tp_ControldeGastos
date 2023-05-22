import  {db}  from './coneccionBD.js'

const agregar = (gasto) => {
  const {email, titulo, monto, fecha, categoria, descripcion} = gasto
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO gastos (email, titulo, monto, fecha, categoria, descripcion) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [email, titulo, monto, fecha, categoria, descripcion], function (err) {
      if (err) {
        console.log(err);
        reject("Error al ingresar gasto");
      } else {
        resolve("Gasto ingresado correctamente");
      }
    });
  });
};




  // const login = (email) => {
  //   return new Promise((resolve, reject) => {
  //     const sql = `SELECT * FROM usuarios WHERE email = ?`;
  //     db.get(sql, [email], (err, row) => {
  //       if (err) {
  //         console.log(err);
  //         reject("Error mail no registrado");
  //       } else {
  //         resolve(row);
  //       }
  //     });
  //   });
  // };



  // const editarUsuario = (email, nombre) => {
  //   return new Promise((resolve, reject) => {
  //     const sql = `UPDATE usuarios SET nombre = ? WHERE email = ?`;
  //     db.run(sql, [nombre, email], function(err) {
  //       if (err) {
  //         console.log(err);
  //         reject("Error en la autenticación");
  //       } else {
  //         db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], (err, row) => {
  //           if (err) {
  //             console.log(err);
  //             reject("Error en la autenticación");
  //           } else {
  //             resolve(row);
  //           }
  //         });
  //       }
  //     });
  //   });
  // };


  // const confirmarRegistro = (email) => {
  //   return new Promise((resolve, reject) => {
  //     const sql = `UPDATE usuarios SET registro = 1 WHERE email = ?`;
  //     db.run(sql, [email], function(err) {
  //       if (err) {
  //         console.log(err);
  //         reject("Error en la confirmación");
  //       } else {
  //         resolve();
  //       }
  //     });
  //   });
  // };



  // const cambiarContrasenia = (email, nuevaPass) => {
  //   return new Promise((resolve, reject) => {
  //     const checkEmailSQL = 'SELECT COUNT(*) as count FROM usuarios WHERE email = ?';
  //     db.get(checkEmailSQL, [email], (err, row) => {
  //       if (row.count === 0) {
  //         reject("El correo electrónico no está registrado");
  //       } else {
  //         const updatePasswordSQL = 'UPDATE usuarios SET pass = ? WHERE email = ?';
  //         db.run(updatePasswordSQL, [nuevaPass, email], function(err) {
  //           if (err) {
  //             console.log(err);
  //             reject("Error en el cambio de contraseña");
  //           } else {
  //             resolve();
  //           }
  //         });
  //       }
  //     });
  //   });
  // };

export default {
  agregar
}