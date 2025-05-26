<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "alcoholimetro");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Credenciales de administrador
$usuario_admin = "admin";
$contrasena_admin = "1234";

// Obtener datos del POST
$usuario = $_POST['usuario'] ?? '';
$contrasena = $_POST['contrasena'] ?? '';

// Validar credenciales
if ($usuario === $usuario_admin && $contrasena === $contrasena_admin) {
    // Consultar registros
    $sql = "SELECT nombre, edad, nivel FROM registros ORDER BY fecha DESC";
    $resultado = $conexion->query($sql);

    if ($resultado->num_rows > 0) {
        echo "<table>
                <tr><th>Nombre</th><th>Edad</th><th>Nivel de Alcohol</th></tr>";
        while ($fila = $resultado->fetch_assoc()) {
            echo "<tr>
                    <td>" . htmlspecialchars($fila['nombre']) . "</td>
                    <td>" . htmlspecialchars($fila['edad']) . "</td>
                    <td>" . htmlspecialchars($fila['nivel']) . "</td>
                  </tr>";
        }
        echo "</table>";
    } else {
        echo "No hay registros.";
    }
} else {
    echo "Credenciales incorrectas";
}

$conexion->close();
?>
