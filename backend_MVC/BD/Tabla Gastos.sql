CREATE TABLE Gastos (
  email TEXT PRIMARY KEY,
  gasto REAL,
  titulo TEXT,
  fecha DATE,
  categoria_id INTEGER,
  descripcion TEXT,
  FOREIGN KEY (categoria_id) REFERENCES Categoria(id)
);