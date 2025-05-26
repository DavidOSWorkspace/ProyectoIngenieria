package control;

import model.Usuario;

import java.io.*;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

public class ControladorUsuario {

    public void crearUsuario() {
        Scanner sc = new Scanner(System.in);

        System.out.print("Ingrese su nombre: ");
        String nombre = sc.nextLine();

        System.out.print("Ingrese su edad: ");
        int edad = sc.nextInt();
        sc.nextLine();

        if (edad < 18) {
            System.out.println("No puedes usar DrinkCheck si eres menor de edad.");
            return;
        }

        System.out.print("Cree una contraseña: ");
        String contraseña = sc.nextLine();

        Random rand = new Random();
        double nivelAlcohol = Math.round((rand.nextDouble() * 1.5) * 100.0) / 100.0;

        System.out.println("Nivel de alcohol simulado: " + nivelAlcohol + " g/L");
        if (nivelAlcohol > 0.5) {
            System.out.println("⚠️ No deberías manejar.");
        } else {
            System.out.println("✅ Estás por debajo del límite legal.");
        }

        Usuario usuario = new Usuario(nombre, edad, contraseña, nivelAlcohol);
        guardarUsuario(usuario);
        System.out.println("Usuario guardado con éxito.");
    }

    public void guardarUsuario(Usuario usuario) {
        File carpeta = new File("data");
        if (!carpeta.exists()) {
            carpeta.mkdir();
        }

        File fichero = new File(carpeta, "FicheroUsuario.txt");
        System.out.println("Guardando en: " + fichero.getAbsolutePath());

        try (PrintWriter pw = new PrintWriter(new FileWriter(fichero, true))) {
            pw.println(usuario.toString());
        } catch (IOException e) {
            System.out.println("Error al guardar el usuario: " + e.getMessage());
        }
    }

    public ArrayList<Usuario> leerUsuarios() {
        ArrayList<Usuario> usuarios = new ArrayList<>();
        File fichero = new File("FicheroUsuario.txt");

        if (!fichero.exists()) {
            return usuarios;
        }

        try (Scanner sc = new Scanner(fichero)) {
            while (sc.hasNextLine()) {
                String linea = sc.nextLine();
                Scanner lectorLinea = new Scanner(linea);
                lectorLinea.useDelimiter(";");

                String nombre = lectorLinea.next();
                int edad = Integer.parseInt(lectorLinea.next());
                String contraseña = lectorLinea.next();
                double nivelAlcohol = Double.parseDouble(lectorLinea.next());

                Usuario usuario = new Usuario(nombre, edad, contraseña, nivelAlcohol);
                usuarios.add(usuario);

                lectorLinea.close();
            }

        } catch (Exception e) {
            System.out.println("Error al leer usuarios: " + e.getMessage());
        }

        return usuarios;
    }

}
