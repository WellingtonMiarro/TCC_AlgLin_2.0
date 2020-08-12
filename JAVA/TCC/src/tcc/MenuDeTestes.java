package tcc;

import java.util.Scanner;

public class MenuDeTestes {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int linha;
        int coluna = 4;

        int codigo;
        boolean entrar = true;

        while (entrar) {
            int matriz[][] = {
                    {2, 1, 3, 13},
                    {3, -1, 0, 1},
                    {1, 3, -4, -5},
                    {1, 1, 1, 1},
                    {1, 1, 1, 1},
                    {1, 1, 1, 1}
            };
            int matrizOriginal[][] = {
                    {2, 1, 3, 13},
                    {3, -1, 0, 1},
                    {1, 3, -4, -5},
                    {1, 1, 1, 1},
                    {1, 1, 1, 1},
                    {1, 1, 1, 1}
            };
            System.out.println("[1]Gaussiana");
            System.out.println("[2]Gauss-Jordan");
            System.out.println("[3]Gauss-Jordan com Inversa");
            System.out.println("[4]Sair");
            System.out.print("Opção: ");
            codigo = sc.nextInt();

            if (codigo == 1) Gaussiana.Gauss( matriz, coluna);
            if (codigo == 2) Imprima.matriz(Gauss.Jordan(matriz, coluna, false), coluna, "Matriz Normalizada");
            if (codigo == 3) Imprima.matriz(Gauss.Jordan(matriz, coluna, true), coluna, "Matriz Inversa");
            if (codigo == 4) entrar = false;
        }
    }
}

