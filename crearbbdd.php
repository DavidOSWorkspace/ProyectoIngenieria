<?php
$conexion = new mysqli("localhost", "root", "");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Crear base de datos si no existe
$sql_db = "CREATE DATABASE IF NOT EXISTS alcoholimetro";
if ($conexion->query($sql_db) === TRUE) {
    echo "Base de datos creada correctamente o ya existía.<br>";
} else {
    die("Error creando la base de datos: " . $conexion->error);
}

// Seleccionar base de datos
$conexion->select_db("alcoholimetro");

// Crear tabla
$sql_tabla = "CREATE TABLE IF NOT EXISTS registros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    nivel DECIMAL(3,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conexion->query($sql_tabla) === TRUE) {
    echo "Tabla creada correctamente o ya existía.<br>";
} else {
    die("Error creando la tabla: " . $conexion->error);
}

$conexion->close();
?>
