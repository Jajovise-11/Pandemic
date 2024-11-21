<?php

//Configurar la conexión
	
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "prueba2";

//Crear conexión

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error){
    echo "error al realizar la conexión";
}

$select_usuarios="SELECT * from usuarios";

$resultado = $conn->query($select_usuarios);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        table{
            width: 80%;
            margin: 20px;
            border-collapse: collapse;
        }
        th, td{
            border: 1px solid #eee;
        }  
    </style>
    <title>Mostrar usuarios</title>
</head>
<body>
    <h1>Mostrar usuarios</h1>
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Password</th>
            </tr>
        </thead>
        <tbody>
            <?php
                while($fila = $resultado->fetch_assoc()){
                    echo"<tr>
                        <td>".$fila['id']."</td> 
                        <td>".$fila['nombre']."</td>
                        <td>".$fila['password']."</td>
                    </tr>";
                }
            ?>
        </tbody>
    </table>
</body>
</html>