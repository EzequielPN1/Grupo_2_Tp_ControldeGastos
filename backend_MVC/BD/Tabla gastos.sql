CREATE TABLE gastos (
  id INTEGER PRIMARY KEY,
  email TEXT,
  titulo TEXT NOT NULL,
  monto DOUBLE NOT NULL,
  fecha DATE NOT NULL,
  categoria TEXT NOT NULL,
  descripcion TEXT,
  FOREIGN KEY(email) REFERENCES usuarios(email)
);