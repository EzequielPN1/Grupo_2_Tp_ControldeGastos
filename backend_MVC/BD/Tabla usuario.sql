CREATE TABLE usuarios (
  email TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  pass TEXT NOT NULL,
  registro boolean DEFAULT false
);

DROP TABLE USUARIOS