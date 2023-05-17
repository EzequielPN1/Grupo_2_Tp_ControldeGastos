import sqlite3 from "sqlite3";

class BaseDeDatosSqlite {
  constructor() {
    // Crea una conexión a la base de datos
    this.coneccion = new sqlite3.Database("./BD/BaseDatosCopy.db", (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Conectado a la base de datos.");
    });
  }

}

export default BaseDeDatosSqlite;