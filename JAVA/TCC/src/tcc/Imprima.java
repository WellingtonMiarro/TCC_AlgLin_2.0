package tcc;

public class Imprima {
    public static void matriz(int matriz[][], int coluna, String mensagem){
       System.out.println("-----------"+mensagem+"-----------");
        for(int i = 0; i < matriz.length/2; i++){
            for(int j = 0; j < coluna; j++){
               if(matriz[i+matriz.length/2][j] == -1 || matriz[i+matriz.length/2][j] == 1) System.out.print("|"+matriz[i][j]/matriz[i+matriz.length/2][j]+"| ");
               else if(matriz[i+matriz.length/2][j] != 0  && matriz[i][j] != 0)System.out.print("|"+matriz[i][j]+"/"+matriz[i+matriz.length/2][j]+"| ");
               else System.out.print("|"+matriz[i][j]+"| ");
            }
            System.out.println();
        }
     
        System.out.println("---------------------------------------");
    }
    public static void vetor(int vetor[],  String mensagem){
        int i=0;
        System.out.println("-----------"+mensagem+"-----------");
               System.out.println(vetor[i]+"/"+vetor[i+1]);
        System.out.println("---------------------------------------");
        }

}
