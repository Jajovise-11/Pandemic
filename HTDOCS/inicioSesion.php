<?php
//Configurar la conexión
$host = "localhost";
$dbname = "prueba2";
$username = "root";
$password = "";

//Crear conexión
$conn = new mysqli($host, $username, $password, $dbname);

if($conn->connect_error){
    echo json_encode([
        "status" => "error",
        "message => "Error de conexión:.
$conn->connect_error
    ]);
    exit();
}

$nombre = $_GET['nombre'];
$pass = $_GET['pass'];

$sql = "SELECT * FROM usuarios WHERE nombre = '$nombre' AND pass = '$pass'";
$resultado = $conn->query($sql);

if($resultado && $resultado->num_rows > 0){
    echo json_encode([
        "status" => "success",
        "message" => "Se logueó correctamente a: ".$nombre
    ]);
}else{
    echo json_encode([
        "status" => "error",
        "message" => "No se logró iniciar sesión: ".$nombre
    ]);
}
?>