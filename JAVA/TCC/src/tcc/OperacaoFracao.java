package tcc;

public class OperacaoFracao {
    public static int[] somaFracao(int numeradorOne, int denominadorOne, int numeradorTwo, int denominadorTwo){
        int vet[] = new int[2];
        int novoDenominador;
        vet[0] = (denominadorTwo * numeradorOne) + (denominadorOne * numeradorTwo);
        vet[1] = denominadorOne * denominadorTwo;

        return  Simplifica(vet);

    }
    public static int[] subFracao(int numeradorOne, int denominadorOne, int numeradorTwo, int denominadorTwo){
        int vet[] = new int[2];
        int novoDenominador;
        vet[0] = (denominadorTwo * numeradorOne) - (denominadorOne * numeradorTwo);
        vet[1] = denominadorOne * denominadorTwo;

        return  Simplifica(vet);

    }
    public static int[] multFracao(int numeradorOne, int denominadorOne, int numeradorTwo, int denominadorTwo){
        int vet[] = new int[2];
        int vetAux[] = new int[2];

        vet[0] = numeradorOne * numeradorTwo;
        vet[1] = denominadorOne * denominadorTwo;

        return Simplifica(vet);
    }
    public static int[] divFracao(int numeradorOne, int denominadorOne, int numeradorTwo, int denominadorTwo, boolean ehUltimaNormaliza){
        int vet[] = new int[2];
        int vetAux[] = new int[2];

        if(denominadorTwo == 0)denominadorTwo=1;
        if(denominadorOne == 0)denominadorOne=1;

        vet[0] = numeradorOne * denominadorTwo;
        vet[1] = denominadorOne * numeradorTwo;

        if (ehUltimaNormaliza) return vet;
        else return Simplifica(vet);
    }

    public static int[] Simplifica(int vet[]) {
        int limite = vet[1];

        if (vet[0] < vet[1])limite = vet[0];
        if(limite < 0)limite*=-1;

        for (int i = limite; i >= 2; i--) {
            if(vet[0] % i == 0 && vet[1] % i == 0){
                vet[0]/=i;
                vet[1]/=i;
                if (vet[0] < vet[1]) limite = vet[0];
                else limite = vet[1];
                if(limite < 0)limite*=-1;
            }
        }
        if(vet[1] == 0 && vet[0] != 0)vet[1]=1;

        return vet;
    }

    
}
