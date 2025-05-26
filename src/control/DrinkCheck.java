package control;

import java.util.Scanner;

public class DrinkCheck {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ControladorUsuario controladorUsuario = new ControladorUsuario();
        ControladorAdministrador controladorAdministrador = new ControladorAdministrador();

        boolean salir = false;

        while (!salir) {
            System.out.println("------ Bienvenido a DrinkCheck ------");
            System.out.println("1. Soy un usuario");
            System.out.println("2. Soy el administrador");
            System.out.println("3. Salir");
            System.out.print("Seleccione una opción: ");

            String opcion = sc.nextLine();

            switch (opcion) {
                case "1":
                    controladorUsuario.crearUsuario();
                    break;
                case "2":
                    controladorAdministrador.iniciarSesion();
                    break;
                case "3":
                    System.out.println("Gracias por usar DrinkCheck. ¡Hasta luego!");
                    salir = true;
                    break;
                default:
                    System.out.println("Opción no válida. Intente nuevamente.");
            }

            System.out.println();
        }
    }
}

