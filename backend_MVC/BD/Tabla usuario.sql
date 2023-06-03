CREATE TABLE usuarios (
  email TEXT PRIMARY KEY,
  celular TEXT NOT NULL,
  nombre TEXT NOT NULL,
  apellido TEXT,
  fechaNac TEXT,
  dni INTEGER,
  pass TEXT NOT NULL,
  registro INTEGER DEFAULT 0
);


DROP TABLE USUARIOS