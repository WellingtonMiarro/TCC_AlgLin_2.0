package tcc;
import java.util.Scanner;

public class Gauss {
    public static int[][] Jordan(int matrizEntrada[][], int coluna, boolean ehInversa){
        int matriz [][]  = matrizEntrada;
        int pivo[] = new int[2];
        int eliminado[];
        int matrizAux[][] = new int[2][coluna];
        int vetAux[];
        int limite = coluna;
        int linha = matriz.length/2;
        if(coluna > linha)limite = linha;
        for(int i = 0; i < limite; i++) {
            pivo[0] = matriz[i][i];
            pivo[1] = matriz[i + linha][i];
            if (pivo[0] == 0) {
                int matrizVerificaTam[][] = Tratamento.Pivo(matriz, coluna, i, true);//Isso retornara a ação de acordo com problema
                pivo[0] = matriz[i][i];
                pivo[1] = matriz[i + linha][i];
                if (matrizVerificaTam.length < matriz.length) {
                        return matrizVerificaTam;
                    }
                else matriz = matrizVerificaTam;
                }

            for(int desceLinha = 0; desceLinha < linha; desceLinha++) {
                if(desceLinha != i) {
                    eliminado = OperacaoFracao.divFracao(matriz[desceLinha][i], matriz[desceLinha + linha][i], pivo[0], pivo[1], false);
                    for (int c = i; c < coluna; c++) {

                        vetAux = OperacaoFracao.multFracao(eliminado[0], eliminado[1], matriz[i][c], matriz[i + linha][c]);
                        matrizAux[0][c] = (vetAux[0] * -1);
                        matrizAux[1][c] = (vetAux[1]);
                        vetAux = OperacaoFracao.somaFracao(matrizAux[0][c], matrizAux[1][c], matriz[desceLinha][c], matriz[desceLinha + linha][c]);
                        matriz[desceLinha][c] = vetAux[0];
                        matriz[desceLinha + linha][c] = vetAux[1];
                    }
                }
            }
        }
        Imprima.matriz(matriz, coluna, "Apenas Eliminada");
        if(ehInversa) return Inversa(normalizar(matriz,coluna, false, false),coluna);
        else return normalizar(matriz, coluna, false, false);
    }
    public static int[][] normalizar(int matriz[][], int colunas, boolean matrizMenor, boolean ehUltimaNormaliza){
        int vetAux[];
        int linhas = matriz.length/2;
        int matrizNormalizada[][] = new int[matriz.length][colunas];
        int limite = colunas;
        if(colunas > linhas)limite = linhas;

        for (int i = 0; i < limite; i++) {
            for (int j = 0; j < colunas; j++) {
                if(ehUltimaNormaliza){
                    vetAux = OperacaoFracao.divFracao(matriz[i][j], matriz[i+linhas][j], matriz[i][i], matriz[i+linhas][i], true);
                    matrizNormalizada[i][j] = vetAux[0];
                    matrizNormalizada[i+linhas][j] = vetAux[1];
                }
                else {
                    vetAux = OperacaoFracao.divFracao(matriz[i][j], matriz[i+linhas][j], matriz[i][i], matriz[i+linhas][i], false);
                    matrizNormalizada[i][j] = vetAux[0];
                    matrizNormalizada[i+linhas][j] = vetAux[1];
                }
            }
        }
        return matrizNormalizada;
    }
    public static int[][] Inversa(int matrizIdentidade[][], int colunas) {
       Imprima.matriz(matrizIdentidade, colunas, "Matriz normalizada");
        Scanner sc = new Scanner(System.in);
        int matrizUnida[][] = new int[matrizIdentidade.length][(colunas * 2)];
        int matrizOriginal[][] = new int[matrizIdentidade.length][colunas];
        int linhas = matrizIdentidade.length/2;

        System.out.print("Digite a matriz Original: ");
        for(int i = 0; i < matrizOriginal.length; i++){
            for(int j = 0; j < colunas; j++){
                if(i < linhas)matrizOriginal[i][j] = sc.nextInt();
                else matrizOriginal[i][j] = 1;
            }
        }
        for (int i = 0; i < linhas; i++) {//Unindo as matrizes
            for (int j = 0; j < colunas; j++) {
                matrizUnida[i][(((colunas*2) / 2) + j)] = matrizIdentidade[i][j];
                matrizUnida[i][j] = matrizOriginal[i][j];
                matrizUnida[i+linhas][(((colunas*2) / 2) + j)] = matrizIdentidade[i+linhas][j];
                matrizUnida[i+linhas][j] = matrizOriginal[i+linhas][j];
            }
        }
        Imprima.matriz(matrizUnida, colunas*2, "Matrizes Unidas");
        int matrizUnidaRecebe[][] = Jordan(matrizUnida, (colunas*2), false);//Passando a matriz unida para eliminação
        Imprima.matriz(matrizUnidaRecebe, colunas*2, "Matrizes Unidas depois da eliminação e normalização");
        int matrizInversa[][] = new int[matrizIdentidade.length][colunas];
        for (int i = 0; i < linhas; i++) {//Separando a matriz inversa
            for (int j = 0; j < colunas; j++) {
                matrizInversa[i][j] = matrizUnidaRecebe[i][((colunas*2)/2)+j];
                matrizInversa[i+linhas][j] = matrizUnidaRecebe[i+linhas][((colunas*2)/2)+j];
            }
        }
        return matrizInversa;
    }
}
