import sqlite3 from "sqlite3";

class ConexionSqlite {

  // Crea una conexión a la base de datos
  static conexion = new sqlite3.Database("./BD/BaseDatosCopy.db", (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  static runQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
      this.conexion.run(sql, params, (err) => {
        if (err) {
          console.log(err);
          reject(err.message);
        } else {
          resolve();
        }
      });
    });
  };
  
  static getRow = (sql, params) => {
    return new Promise((resolve, reject) => {
      this.conexion.get(sql, params, (err, row) => {
        if (err) {
          console.log(err);
          reject(err.message);
        } else {
          resolve(row);
        }
      });
    });
  };

  static getAllRows = (sql, params) => {
    return new Promise((resolve, reject) => {
      this.conexion.all(sql, params, (err, row) => {
        if (err) {
          console.log(err);
          reject(err.message);
        } else {
          resolve(row);
        }
      });
    });
  };

}

export default ConexionSqlite;