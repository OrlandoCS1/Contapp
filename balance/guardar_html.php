<?php
include 'conexion.php';

// Recibir el contenido HTML desde POST
$contenidoHTML = $_POST['html'];

// Preparar consulta
$sql = "INSERT INTO documentos (id_documento, documento) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

$id = null; // si quieres ID AUTO_INCREMENT, se cambia la tabla

$stmt->bind_param("is", $id, $contenidoHTML);

if ($stmt->execute()) {
    echo "Documento guardado exitosamente";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
