CREATE TABLE gastos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT,
  titulo TEXT NOT NULL,
  monto DOUBLE NOT NULL,
  fecha DATE NOT NULL,
  idCategoria INTEGER NOT NULL,
  descripcion TEXT,
  FOREIGN KEY(email) REFERENCES usuarios(email),
  FOREIGN KEY(idCategoria) REFERENCES categorias(id)
);