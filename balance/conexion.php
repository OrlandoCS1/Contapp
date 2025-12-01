<?php
$host = "localhost";
$usuario = "root";
$clave = "1503"; // si pusiste contraseña, ponla aquí
$puerto = 3307;
$bd = "contapp";

$conexion = new mysqli($host, $usuario, $clave, $bd, $puerto);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

echo "Conectado correctamente a MariaDB!";
?>
