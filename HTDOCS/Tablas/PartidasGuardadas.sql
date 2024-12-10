CREATE TABLE PartidasGuardadas(
    id_partida INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    estado_partida TEXT NOT NULL,
    fecha_guardado DATETIME DEFAULT,
    FOREIGN KEY(id_usuario) REFERENCES Usuarios(id_usuario)
);