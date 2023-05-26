CREATE TABLE categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  presupuesto DOUBLE NOT NULL,
  FOREIGN KEY(email) REFERENCES usuarios(email)
);