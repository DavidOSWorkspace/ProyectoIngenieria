<?php
$conexion = new mysqli("localhost", "root", "", "alcoholimetro");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$nombre = $_POST['nombre'] ?? '';
$edad = $_POST['edad'] ?? 0;
$nivel = $_POST['nivel'] ?? 0.0;

$stmt = $conexion->prepare("INSERT INTO registros (nombre, edad, nivel) VALUES (?, ?, ?)");
$stmt->bind_param("sid", $nombre, $edad, $nivel);

if ($stmt->execute()) {
    echo "Datos guardados correctamente";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>
