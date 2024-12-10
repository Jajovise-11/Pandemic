CREATE TABLE Ranking(
    id_puntuacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    puntuacion INT NOT NULL,
    fecha DATETIME DEFAULT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);