package tcc;

public class Gaussiana {
    public static int[][] Gauss(int matrizEntrada[][], int coluna){
        int matriz [][]  = matrizEntrada;
        int pivo[] = new int[2];
        int eliminado[];
        int matrizAux[][] = new int[2][coluna];
        int vetAux[];
        int limite = coluna;
        int linha = matriz.length/2, j =1;
        if(coluna > linha)limite = linha;

        for(int i = 0; i < limite; i++){
            pivo[0] = matriz[i][i];
            pivo[1] = matriz[i+linha][i];
            if (pivo[0] == 0) {
                int matrizVerificaTam[][] = Tratamento.Pivo(matriz, coluna, i, false);//Isso retornara a ação de acordo com problema
                pivo[0] = matriz[i][i];
                pivo[1] = matriz[i + linha][i];
                if (matrizVerificaTam.length < matriz.length) {
                    Imprima.matriz(matrizVerificaTam, coluna, "Matriz com linha zerada");
                    return matrizVerificaTam;
                }
                else matriz = matrizVerificaTam;
            }
            for(int desceLinha = j; desceLinha < linha; desceLinha++) {
               eliminado = OperacaoFracao.divFracao( matriz[desceLinha][i], matriz[desceLinha+linha][i], pivo[0], pivo[1], false);
                 for(int c = i; c < coluna; c++){
                     vetAux = OperacaoFracao.multFracao(eliminado[0], eliminado[1], matriz[i][c], matriz[i+linha][c]);
                     matrizAux[0][c] = (vetAux[0]*-1);
                     matrizAux[1][c] = (vetAux[1]);
                     vetAux = OperacaoFracao.somaFracao(matrizAux[0][c] ,  matrizAux[1][c], matriz[desceLinha][c] , matriz[desceLinha+linha][c]);
                     matriz[desceLinha][c] = vetAux[0];
                     matriz[desceLinha+linha][c] = vetAux[1];
                 }
            }
            j++;
            if(i == (linha - 2)&& matriz[i+1][i+1] == 0){
                int matrizVerificaTam[][] = Tratamento.Pivo(matriz,  coluna, linha-1, false);
                return matrizVerificaTam;
            }
        }

        return volta(matriz, coluna);
    }
    public static int[][] volta(int matriz[][], int coluna){
        int linha = matriz.length/2;
        int matrizAux[][] = new int[matriz.length][1];
        int vetAux[];
        int vetAuxTwo[] =  new int[2];

        for(int i = linha-1; i >= 0; i--){
            vetAuxTwo[0] = matriz[i][coluna-1];
            vetAuxTwo[1] =  matriz[i+linha][coluna-1];

            if(i < linha-1) {
                for (int j = coluna - 2; j >= i; j--) {
                    if (matriz[i][j] != 0 && j != i) {
                        vetAux = OperacaoFracao.multFracao(matriz[i][j], matriz[i+linha][j], matrizAux[j][0], matrizAux[j+linha][0]);
                        vetAuxTwo = OperacaoFracao.somaFracao((vetAux[0] * -1), (vetAux[1]), vetAuxTwo[0], vetAuxTwo[1]);

                    }
                    if (j == i) {
                        vetAux = OperacaoFracao.divFracao(vetAuxTwo[0], vetAuxTwo[1], matriz[i][j], matriz[i + linha][j], false);
                        matrizAux[i][0] = vetAux[0];
                        matrizAux[i + linha][0] = vetAux[1];
                    }
                }
            }
            else{
                vetAux = OperacaoFracao.divFracao(matriz[i][coluna-1], matriz[i+linha][coluna-1],matriz[i][i], matriz[i+linha][i], false);
                matrizAux[i][0] = vetAux[0];
                matrizAux[i+linha][0] = vetAux[1];
            }

        }
        Imprima.matriz(matriz, coluna, "Fim da eliminação gaussiana");
        Imprima.matriz(matrizAux, 1, "Resultado");
        return matriz;
    }
}
