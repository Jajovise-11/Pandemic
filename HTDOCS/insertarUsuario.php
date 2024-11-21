<?php
	//Recoger datos

	$nombre = $_GET['nombre'];
	$pass = $_GET['pass'];
	
	
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

	

	$insertarUsuario = "INSERT INTO usuarios(nombre, password) VALUES ('$nombre', '$pass')";

	$conn->query($insertarUsuario);

		echo "Se insertó correctamente a: ".$nombre;

?>