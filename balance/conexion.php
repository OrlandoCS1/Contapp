<?php
$host = "localhost";
$usuario = "root";
$password = "1503";
$baseDatos = "contapp";

$conexion = new mysqli($host, $usuario, $password, $baseDatos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>
