import sqlite3 from "sqlite3";

// Crea una conexión a la base de datos
  const db = new sqlite3.Database("./BD/BaseDatosCopy.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Conectado a la base de datos.");
  });

  export  {
    db
  }