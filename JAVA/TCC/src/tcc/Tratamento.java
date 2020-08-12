package tcc;

public class Tratamento {
    public static int[][] Pivo ( int matriz[][], int coluna, int posiPivo, boolean ehGaussJordan){
        int linha = matriz.length/2;
        boolean ok = true;
        if (posiPivo < linha) {
            for (int j = posiPivo + 1; j < linha; j++) {
                if (matriz[j][posiPivo] != 0){
                    matriz = trocarLinhas(matriz, coluna, posiPivo, j);
                    ok = false;
                }
            }
        }
        if(ok){
            int pos = 0;
            while (pos < coluna && matriz[posiPivo][pos] == 0){
                pos++;
            }
            if(pos == coluna){
                if(ehGaussJordan){
                    return Gauss.normalizar(retiraLinha(matriz, coluna, posiPivo), coluna, true, false);
                }
                else return retiraLinha(matriz, linha, posiPivo);
            }
            else{
                int vetAux[] = new int [2];
                vetAux[0] = matriz[posiPivo][pos];
                vetAux[1] = matriz[posiPivo+linha][pos];
                matriz[posiPivo][posiPivo] = vetAux[0];
                matriz[posiPivo+linha][posiPivo] = vetAux[1];
                matriz[posiPivo][pos] = 0;
                matriz[posiPivo+linha][pos] = 0;
                return matriz;
            }
        }
        return matriz;
    }
    public static int[][] trocarLinhas(int matriz[][], int coluna, int posPivoAtual, int proxPivo){
        int vetAux[] = new int[coluna];
        for (int j = 0; j < coluna; j++) {
            vetAux[j] = matriz[posPivoAtual][j];
            matriz[posPivoAtual][j] = matriz[proxPivo][j];
            matriz[proxPivo][j] = vetAux[j];
        }
        return matriz;
    }
    public static int[][] retiraLinha(int matriz[][], int coluna, int posPivo){
        int linha = matriz.length/2;
        int matrizTrocada[][] = new int[matriz.length-1][coluna];
        for(int i = 0; i < linha; i++){
            if(i != posPivo) {
                for (int j = 0; j < coluna; j++) {
                    matrizTrocada[i][j] = matriz[i][j];
                    matrizTrocada[i+linha][j] = matriz[i+linha][j];
                }
            }
        }
        return matrizTrocada;
    }
}
