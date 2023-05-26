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

  const editar = (id, gasto) => {
    return new Promise((resolve, reject) => {
      const {email, titulo, monto, fecha, categoria, descripcion} = gasto
      const sql = `UPDATE gastos SET email = ?, titulo = ?, monto = ?, fecha = ?, categoria = ?, descripcion = ? WHERE id = ?`;
      db.run(sql, [email, titulo, monto, fecha, categoria, descripcion, id], function(err) {
        if (err) {
          console.log(err);
          reject("Error al editar gasto");
        } else {
          resolve("Gasto editado correctamente");
        }
      });
    });
  };

  const eliminar = (id) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM gastos WHERE id = ?`;
      db.run(sql, [id], function(err) {
        if (err) {
          console.log(err);
          reject("Error al eliminar gasto");
        } else {
          resolve("Gasto eliminado correctamente");
        }
      });
    });
  };

const listar = email => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM gastos WHERE email = ?`;
    db.all(sql, [email], (err, rows) => {
      if (err) {
        console.log(err);
        reject("Error al listar gastos");
      } else {
        console.log(rows);
        resolve(rows);
      }
    });
  });
};

export default {
  agregar,
  editar,
  eliminar,
  listar
}