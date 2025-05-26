package control;

import model.Usuario;

import java.util.ArrayList;
import java.util.Scanner;

public class ControladorAdministrador {

    public void iniciarSesion() {
        Scanner sc = new Scanner(System.in);

        System.out.print("Ingrese su nombre de administrador: ");
        String nombre = sc.nextLine();

        System.out.print("Ingrese su contraseña: ");
        String contraseña = sc.nextLine();

        if (nombre.equals("admin") && contraseña.equals("1234")) {
            System.out.println("\n✅ Acceso concedido. Lista de usuarios registrados:\n");

            ControladorUsuario cu = new ControladorUsuario();
            ArrayList<Usuario> usuarios = cu.leerUsuarios();

            if (usuarios.isEmpty()) {
                System.out.println("No hay usuarios registrados aún.");
            } else {
                for (Usuario u : usuarios) {
                    System.out.println("Nombre: " + u.getNombre());
                    System.out.println("Edad: " + u.getEdad());
                    System.out.println("Contraseña: " + u.getContraseña());
                    System.out.println("Nivel de alcohol: " + u.getNivelAlcohol() + " g/L");
                    System.out.println("-------------------------------");
                }
            }

        } else {
            System.out.println("❌ Acceso denegado. Credenciales incorrectas.");
        }
    }
}
