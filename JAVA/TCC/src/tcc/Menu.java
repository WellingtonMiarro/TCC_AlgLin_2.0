package tcc;
import java.util.*;
public class Menu {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        boolean entrar = true;

        while (entrar) {
            System.out.println("Informe o tamanho da matriz");
            System.out.print("linha: ");
            int linha = sc.nextInt();
            System.out.print("coluna: ");
            int coluna = sc.nextInt();
            System.out.println("Digite a matriz");

            int matrizOriginal[][] = new int[linha * 2][coluna];

            int codigo;

            for (int i = 0; i < matrizOriginal.length; i++) {
                for (int j = 0; j < coluna; j++) {
                    if (i < linha) {
                        matrizOriginal[i][j] = sc.nextInt();
                    }
                    else{
                        matrizOriginal[i][j] = 1;
                    }
                }
            }
            int  matrizP[][] = matrizOriginal;
            System.out.println("[1]Gaussiana");
            System.out.println("[2]Gauss-Jordan");
            System.out.println("[3]Gauss-Jordan com Inversa");
            System.out.println("[4]Sair");
            System.out.print("Opção: ");

            codigo = sc.nextInt();

            if (codigo == 1) Gaussiana.Gauss(matrizP, coluna);
            if (codigo == 2) Imprima.matriz(Gauss.Jordan(matrizP, coluna, false), coluna, "Fim da eliminação Gauss-Jordan");
            if (codigo == 3) Imprima.matriz(Gauss.Jordan(matrizP, coluna, true), coluna, "Matriz Inversa");
            if (codigo == 4) entrar = false;

          }
        }
}
