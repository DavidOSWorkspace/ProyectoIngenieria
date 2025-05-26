package model;

public class Usuario {
    private String nombre;
    private int edad;
    private String contraseña;
    private double nivelAlcohol;

    public Usuario(String nombre, int edad, String contraseña, double nivelAlcohol) {
        this.nombre = nombre;
        this.edad = edad;
        this.contraseña = contraseña;
        this.nivelAlcohol = nivelAlcohol;
    }

    public String getNombre() {
        return nombre;
    }

    public int getEdad() {
        return edad;
    }

    public String getContraseña() {
        return contraseña;
    }

    public double getNivelAlcohol() {
        return nivelAlcohol;
    }

    @Override
    public String toString() {
        return nombre + ";" + edad + ";" + contraseña + ";" + nivelAlcohol;
    }
}
