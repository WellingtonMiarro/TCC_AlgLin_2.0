/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tcc;

/**
 *
 * @author Wellington
 */
public class MetodoGauss {

    private static final double nuloNum = 1e-5;

    public static void main(String[] args) {
        int TamanhoMatriz = 4;
        double[][] A = {
                {1,1,1,1 },
                {4,4,2,2  },
                { 2,1,-1,0}
             
        };

        double[] igual = { 16.4, -49.7, -80.8, -106.3 };
        // (R1, R2, R3}

        double[] x = LinearS(A, igual);
        int num = 1;

        for (int i = 0; i < TamanhoMatriz; i++) {
            System.out.printf("x" + num + " = ");
            System.out.printf("%.4f ", x[i]);
            System.out.printf("\n");
            num++;
        }

    }

    // Ultilizando o metodo de gauss ele elemina e seleciona um pivô
    public static double[] LinearS(double[][] A, double[] b) {
        int n = b.length;

        for (int p = 0; p < n; p++) {

            // Encontra a coluna Pivô e substitui
            int max = p;
            for (int i = p + 1; i < n; i++) {
                if (Math.abs(A[i][p]) > Math.abs(A[max][p])) {
                    max = i;
                }
            }
            double[] temp = A[p]; A[p] = A[max]; A[max] = temp;
            double   t    = b[p]; b[p] = b[max]; b[max] = t;

            // Vê se a matriz tem inversa
            if (Math.abs(A[p][p]) <= nuloNum) {
                throw new ArithmeticException("Determinante é 0");
            }

            for (int i = p + 1; i < n; i++) {
                double alpha = A[i][p] / A[p][p];
                b[i] -= alpha * b[p];
                for (int j = p; j < n; j++) {
                    A[i][j] -= alpha * A[p][j];
                }
            }
        }

        // Substituição de volta
        double[] x = new double[n];
        for (int i = n - 1; i >= 0; i--) {
            double sum = 0.0;
            for (int j = i + 1; j < n; j++) {
                sum += A[i][j] * x[j];
            }
            x[i] = (b[i] - sum) / A[i][i];
        }
        return x;
    }

}