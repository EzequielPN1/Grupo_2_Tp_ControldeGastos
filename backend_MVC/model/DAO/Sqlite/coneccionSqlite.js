import sqlite3 from "sqlite3";

class BaseDeDatosSqlite {
  // Crea una conexión a la base de datos
  static coneccion = new sqlite3.Database("./BD/BaseDatosCopy.db", (err) => {
    if (err) {
      console.error(err.message);
    }
  });
}

export default BaseDeDatosSqlite;