import sqlite3 from "sqlite3";

class BaseDeDatosSqlite {
  // Crea una conexión a la base de datos
  static coneccion = new sqlite3.Database("./BD/BaseDatosCopy.db", (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  static runQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
      this.coneccion.run(sql, params, (err) => {
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
      this.coneccion.get(sql, params, (err, row) => {
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

export default BaseDeDatosSqlite;