<?php

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Content-Type: aplication/json');

	//Recoger datos

	$json = file_get_contents('php//input');

	$usuario = json_encode($json);
	
	
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

	

	$insertarUsuario = "INSERT INTO usuarios(nombre, password) VALUES ('$usuario->nombre', '$usuario->password')";

	$conn->query($insertarUsuario);

		echo "Se insertó correctamente a: ".$usuario->nombre;

?>