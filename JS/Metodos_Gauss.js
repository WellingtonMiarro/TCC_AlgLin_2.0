class Metodos_Gauss {
  //Começo eliminação gaussiana----------------------------------
  gaussiana(matrizEntrada) {
    console.log("INICIAR ELIMINAÇÃO GAUSSIANA");
    let matriz = this.criarDenominar(matrizEntrada); //Passando a matriz original para outra matriz preenchendo os denumeradores
    let coluna = matrizEntrada[0].length; //quantidade de colunas
    let pivo = []; //vetor que vai gurdar o pivo
    let eliminado = []; //vetor que recebe os valores depois da divisão dos
    let matrizAux = Array([], []);
    let vetAux = [];
    let limite = coluna;
    let linha = matriz.length / 2,
      j = 1;
    if (coluna > linha) limite = linha; //O limite recebe o tamanho menor da ordem da matriz

    for (let i = 0; i < limite; i++) {
      pivo[0] = matriz[i][i];
      pivo[1] = matriz[i + linha][i];
      if (pivo[0] == 0) {
        let matrizVerificaTam = this.pivo(matriz, i, false); //Chamando tratamento se o pivo for zero
        pivo[0] = matriz[i][i];
        pivo[1] = matriz[i + linha][i];
        if (matrizVerificaTam.length < matriz.length) {
          //Se houver uma linha da matriz toda zerada o sistema se torna impossível então a linha é retirada e se retorna a matriz
          this.imprimaMatriz(matrizVerificaTam, "Matriz com linha zerada"); //Imprima a matriz
          return matrizVerificaTam;
        } else matriz = matrizVerificaTam;
      }
      //ELIMINAÇÃO: Divide os número abaixo do pivo, pelo pivo, multiplica o NÚMERADOR por -1 pra inverter o sinal;
      //logo em seguida multiplica o valor obtido pela linha do pivo e armazena esse valor em uma matriz auxiliar;
      //logo em seguida soma a linha resultante com a linha do número que será eliminado,

      for (let desceLinha = j; desceLinha < linha; desceLinha++) {
        //ELIMINAÇÃO
        eliminado = this.divFracao(
          matriz[desceLinha][i],
          matriz[desceLinha + linha][i],
          pivo[0],
          pivo[1],
          false
        );
        for (let c = i; c < coluna; c++) {
          vetAux = this.multFracao(
            eliminado[0],
            eliminado[1],
            matriz[i][c],
            matriz[i + linha][c]
          );
          matrizAux[0][c] = vetAux[0] * -1;
          matrizAux[1][c] = vetAux[1];
          vetAux = this.somaFracao(
            matrizAux[0][c],
            matrizAux[1][c],
            matriz[desceLinha][c],
            matriz[desceLinha + linha][c]
          );
          matriz[desceLinha][c] = vetAux[0];
          matriz[desceLinha + linha][c] = vetAux[1];
        }
      }
      j++; //Descer a linha
    }
    this.imprimaMatriz(matriz, "Fim da eliminação gaussiana"); //Imprima matriz
    return this.volta(matriz); //Chamar calculo da volta
  }
  volta(matriz) {
    console.log("INICIAR CÁLCULO DA VOLTA");
    let linha = matriz.length / 2;
    let matrizAux = this.criarMatriz(matriz.length, 1); //cria a matriz de tamanho X por X
    let vetAux = [];
    let vetAuxTwo = [];
    let coluna = matriz[0].length;

    for (let i = linha - 1; i >= 0; i--) {
      vetAuxTwo[0] = matriz[i][coluna - 1];
      vetAuxTwo[1] = matriz[i + linha][coluna - 1];

      if (i < linha - 1) {
        //fazendo o calculo das equações
        for (let j = coluna - 2; j >= i; j--) {
          if (matriz[i][j] != 0 && j != i) {
            vetAux = this.multFracao(
              matriz[i][j],
              matriz[i + linha][j],
              matrizAux[j][0],
              matrizAux[j + linha][0]
            );
            vetAuxTwo = this.somaFracao(
              vetAux[0] * -1,
              vetAux[1],
              vetAuxTwo[0],
              vetAuxTwo[1]
            );
          }
          if (j == i) {
            vetAux = this.divFracao(
              vetAuxTwo[0],
              vetAuxTwo[1],
              matriz[i][j],
              matriz[i + linha][j],
              false
            );
            matrizAux[i][0] = vetAux[0];
            matrizAux[i + linha][0] = vetAux[1];
          }
        }
      } else {
        vetAux = this.divFracao(
          matriz[i][coluna - 1],
          matriz[i + linha][coluna - 1],
          matriz[i][i],
          matriz[i + linha][i],
          false
        );
        matrizAux[i][0] = vetAux[0];
        matrizAux[i + linha][0] = vetAux[1];
      }
    }

    this.imprimaMatriz(matrizAux, "Resultado da volta"); //Imprima matriz
    return matriz;
  }
  //Fim eliminação gaussiana ---------------------------------------

  // Começo Gauss-Jordan-------------------
  jordan(matrizEntrada, ehInversa, noInversa) {
    console.log("INICIAR GAUSS-JORDAN");
    let matriz = matrizEntrada;
    let matrizOriginal = this.criarDenominar(matrizEntrada);
    if (ehInversa) matriz = this.criarDenominar(matrizEntrada); //Passando a matriz original para outra matriz preenchendo os denumeradores
    if (noInversa) matriz = this.criarDenominar(matrizEntrada);
    let coluna = matriz[0].length;
    let pivo = [];
    let eliminado = [];
    let matrizAux = Array([], []);
    let vetAux = [];
    let limite = coluna;
    let linha = matriz.length / 2;

    if (coluna > linha) limite = linha;
    for (let i = 0; i < limite; i++) {
      //escolha do pivo
      pivo[0] = matriz[i][i];
      pivo[1] = matriz[i + linha][i];
      if (pivo[0] == 0) {
        let matrizVerificaTam = this.pivo(matriz, i, true); //Quando o número na diagonal é zero
        pivo[0] = matriz[i][i];
        pivo[1] = matriz[i + linha][i];
        if (matrizVerificaTam.length < matriz.length) {
          //se uma linha é zerada, ela é eliminada e se rotorna a matriz normalizada.
          return matrizVerificaTam;
        } else matriz = matrizVerificaTam; //se não continua
      }

      //ELIMINAÇÃO: Divide os número abaixo ou acima do pivo caso tenha, pelo pivo, multiplica o NÚMERADOR por -1 pra inverter o sinal;
      //logo em seguida multiplica o valor obtido pela linha do pivo e armazena esse valor em uma matriz auxiliar;
      //logo em seguida soma a linha resultante com a linha do número que será eliminado,

      for (let desceLinha = 0; desceLinha < linha; desceLinha++) {
        //ELIMINAÇÃO
        if (desceLinha != i) {
          eliminado = this.divFracao(
            matriz[desceLinha][i],
            matriz[desceLinha + linha][i],
            pivo[0],
            pivo[1],
            false
          );
          for (let c = i; c < coluna; c++) {
            vetAux = this.multFracao(
              eliminado[0],
              eliminado[1],
              matriz[i][c],
              matriz[i + linha][c]
            ); //MULTIPLICANDO A LINHA DO PIVO
            matrizAux[0][c] = vetAux[0] * -1; //TROCANDO O SINAL
            matrizAux[1][c] = vetAux[1];

            vetAux = this.somaFracao(
              matrizAux[0][c],
              matrizAux[1][c],
              matriz[desceLinha][c],
              matriz[desceLinha + linha][c]
            );
            matriz[desceLinha][c] = vetAux[0];
            matriz[desceLinha + linha][c] = vetAux[1];
          }
        }
      }
    }
    this.imprimaMatriz(matriz, "Fim da Eliminção Gauss-Jordan"); //Imprimindo no console
    if (ehInversa)
      return this.inversa(matrizOriginal, this.normalizar(matriz, false));
    //Se inversa ainda não foi chamada
    else return this.normalizar(matriz, false); //se inversa já foi chamada uma vez
  }
  normalizar(matriz, ehUltimaNormaliza) {
    let colunas = matriz[0].length;
    let vetAux = [];
    let linhas = matriz.length / 2;
    let matrizNormalizada = this.criarMatriz(matriz.length, colunas);
    let limite = colunas;
    if (colunas > linhas) limite = linhas;

    for (let i = 0; i < limite; i++) {
      for (let j = 0; j < colunas; j++) {
        if (ehUltimaNormaliza) {
          //na ultima normaização não simplifica as frações
          vetAux = this.divFracao(
            matriz[i][j],
            matriz[i + linhas][j],
            matriz[i][i],
            matriz[i + linhas][i],
            true
          );
          matrizNormalizada[i][j] = vetAux[0];
          matrizNormalizada[i + linhas][j] = vetAux[1];
        } else {
          vetAux = this.divFracao(
            matriz[i][j],
            matriz[i + linhas][j],
            matriz[i][i],
            matriz[i + linhas][i],
            false
          );
          matrizNormalizada[i][j] = vetAux[0];
          matrizNormalizada[i + linhas][j] = vetAux[1];
        }
      }
    }
    this.imprimaMatriz(matrizNormalizada, "Matriz normalizada");
    return matrizNormalizada;
  }
  inversa(mtOriginal, matrizIdentidade) {
    console.log("---------INICIAR CÁLCULO DA INVERSA--------");
    let colunas = matrizIdentidade[0].length;
    let matrizUnida = this.criarMatriz(matrizIdentidade.length, colunas * 2);
    let matrizOriginal = mtOriginal;
    let linhas = matrizIdentidade.length / 2;

    console.log("Unir matriz identidade a matriz original");
    for (let i = 0; i < linhas; i++) {
      //Unindo as matrizes
      for (let j = 0; j < colunas; j++) {
        matrizUnida[i][(colunas * 2) / 2 + j] = matrizIdentidade[i][j];
        matrizUnida[i][j] = matrizOriginal[i][j];
        matrizUnida[i + linhas][(colunas * 2) / 2 + j] =
          matrizIdentidade[i + linhas][j];
        matrizUnida[i + linhas][j] = matrizOriginal[i + linhas][j];
      }
    }
    this.imprimaMatriz(matrizUnida, "Matrizes Unidas");
    let matrizUnidaRecebe = this.jordan(matrizUnida, false, false); //Passando a matriz unida para eliminação jordan
    let matrizInversa = this.criarMatriz(matrizIdentidade.length, colunas);
    console.log("Separar matrizes");
    for (let i = 0; i < linhas; i++) {
      // separando a matriz inversa da matriz unida
      for (let j = 0; j < colunas; j++) {
        matrizInversa[i][j] = matrizUnidaRecebe[i][(colunas * 2) / 2 + j];
        matrizInversa[i + linhas][j] =
          matrizUnidaRecebe[i + linhas][(colunas * 2) / 2 + j];
      }
    }
    this.imprimaMatriz(
      matrizInversa,
      "Matriz resultante do calculo da inversa"
    );
    console.log("----FIM----");
    return matrizInversa;
  }
  // Fim Gauss-Jordan-------------------

  // Começo Tratamento de ambas as eliminações
  pivo(matriz, posiPivo, ehGaussJordan) {
    let coluna = matriz[0].length;
    let linha = matriz.length / 2;
    let ok = true;
    if (posiPivo < linha - 1) {
      for (let j = posiPivo + 1; j < linha; j++) {
        if (matriz[j][posiPivo] != 0) {
          //Verifica se a linha não é toda zerada se não for ele tenta trocar as linhas
          matriz = this.trocarLinhas(matriz, posiPivo, j);
          ok = false;
        }
      }
    }
    if (ok) {
      //Se não for possível trocar as linhas
      let pos = 0;
      while (pos < coluna && matriz[posiPivo][pos] == 0) {
        pos++;
      }
      if (pos == coluna) {
        if (ehGaussJordan) {
          return this.normalizar(retiraLinha(matriz, posiPivo), false);
        } else return this.retiraLinha(matriz, linha, posiPivo);
      } else {
        let vetAux = [];
        vetAux[0] = matriz[posiPivo][pos];
        vetAux[1] = matriz[posiPivo + linha][pos];
        matriz[posiPivo][posiPivo] = vetAux[0];
        matriz[posiPivo + linha][posiPivo] = vetAux[1];
        matriz[posiPivo][pos] = 0;
        matriz[posiPivo + linha][pos] = 0;
        return matriz;
      }
    }
    return matriz;
  }
  trocarLinhas(matriz, posPivoAtual, proxPivo) {
    let coluna = matriz[0].length;
    let vetAux = [];
    for (let j = 0; j < coluna; j++) {
      vetAux[j] = matriz[posPivoAtual][j];
      matriz[posPivoAtual][j] = matriz[proxPivo][j];
      matriz[proxPivo][j] = vetAux[j];
    }
    return matriz;
  }
  retiraLinha(matriz, posPivo) {
    let coluna = matriz[0].length;
    let linha = matriz.length / 2;
    let matrizTrocada = matriz.length - 1;
    for (let i = 0; i < linha; i++) {
      if (i != posPivo) {
        for (let j = 0; j < coluna; j++) {
          matrizTrocada[i][j] = matriz[i][j];
          matrizTrocada[i + linha][j] = matriz[i + linha][j];
        }
      }
    }
    return matrizTrocada;
  }
  criarMatriz(linha, coluna) {
    //Cria a matriz com a quantidade linhas que quiser
    let matriz = new Array(linha);
    for (let i = 0; i < linha; i++) {
      matriz[i] = Array(coluna);
    }
    return matriz;
  }
  criarDenominar(matriz) {
    //Metodo que cria a nova matriz com o dobro de linhas e as preenches com os denominadores
    let linha = matriz.length;
    let coluna = matriz[0].length;
    let matrizCompleta = this.criarMatriz(linha * 2, coluna);
    for (let i = 0; i < linha; i++) {
      for (let j = 0; j < coluna; j++) {
        matrizCompleta[i][j] = matriz[i][j];
        matrizCompleta[i + linha][j] = 1;
      }
    }
    return matrizCompleta;
  }
  // Fim Tratamento de ambas as eliminações
  //Começo operações com frações
  somaFracao(numeradorOne, denominadorOne, numeradorTwo, denominadorTwo) {
    let vet = [];

    vet[0] = denominadorTwo * numeradorOne + denominadorOne * numeradorTwo;
    vet[1] = denominadorOne * denominadorTwo;

    return this.Simplifica(vet);
  }
  multFracao(numeradorOne, denominadorOne, numeradorTwo, denominadorTwo) {
    let vet = [];
    let vetAux = [];

    vet[0] = numeradorOne * numeradorTwo;
    vet[1] = denominadorOne * denominadorTwo;

    return this.Simplifica(vet);
  }
  divFracao(
    numeradorOne,
    denominadorOne,
    numeradorTwo,
    denominadorTwo,
    ehUltimaNormaliza
  ) {
    let vet = [];

    if (denominadorTwo == 0) denominadorTwo = 1;
    if (denominadorOne == 0) denominadorOne = 1;

    vet[0] = numeradorOne * denominadorTwo;
    vet[1] = denominadorOne * numeradorTwo;

    if (ehUltimaNormaliza) return vet;
    else return this.Simplifica(vet);
  }

  Simplifica(vet) {
    let limite = vet[1];

    if (vet[0] < vet[1]) limite = vet[0];
    if (limite < 0) limite *= -1;

    for (let i = limite; i >= 2; i--) {
      if (vet[0] % i == 0 && vet[1] % i == 0) {
        vet[0] /= i;
        vet[1] /= i;
        if (vet[0] < vet[1]) limite = vet[0];
        else limite = vet[1];
        if (limite < 0) limite *= -1;
      }
    }
    if (vet[1] == 0 && vet[0] != 0) vet[1] = 1;
    return vet;
  }

  //Fim operações com frações
  // Começo metodo para imprimir
  imprimaMatriz(matriz, mensagem) {
    //Esse metodo funciona como um filtro mostrando em forma de fração apenas os números decimais. Pra isso ele armazena os números que são convenientes de serem mostrados na 'matrizSaida'.
    let coluna = matriz[0].length;
    let matrizSaida = this.criarMatriz(matriz.length / 2, coluna);
    console.log("-----------" + mensagem + "-----------");
    for (let i = 0; i < matriz.length / 2; i++) {
      for (let j = 0; j < coluna; j++) {
        if (
          matriz[i + matriz.length / 2][j] == -1 ||
          matriz[i + matriz.length / 2][j] == 1
        )
          matrizSaida[i][j] = matriz[i][j] / matriz[i + matriz.length / 2][j];
        else if (matriz[i + matriz.length / 2][j] != 0 && matriz[i][j] != 0)
          matrizSaida[i][j] =
            matriz[i][j] + "/" + matriz[i + matriz.length / 2][j];
        else matrizSaida[i][j] = matriz[i][j];
        if (matrizSaida[i][j] == -0) matrizSaida[i][j] = 0;
      }
    }

    console.table(matrizSaida);
  }
  // Fim metodo para imprimir
}

// Os cálculos são feitos com frações, depois que as matrizes forem passadas para eliminação...
// será criada uma nova matriz com o dobro de linhas essas novas linhas serão preenchidas com o número "1" que é o denominador de qualquer número inteiro...
// durante o processo caso haja números decimais eles serão armazenados em forma de fração...

let matriz = [
  [1, 0, 2],
  [1, 2, 1],
  [0, 1, 2],
];

const elimina = new Metodos_Gauss();

console.log(elimina.jordan(matriz, true, false)); //Caso  queira com inversa(true, false), se não (false, true)

let matrizG = [
  [2, 1, 3, 13],
  [3, -1, 0, 1],
  [1, 3, -4, -5],
];

//console.log(elimina.gaussiana(matrizG));

/**
   * Entrada de Matriz Gaussiana: 
   * 
   * 
   ///////////////////////////////////// 
   MATRIZ= [ 
          [2, 1, 3, 13],
          [3, -1, 0, 1],
          [1, 3, -4, -5]
          ];
            ONDE A RESPOSTA É: 
                    [1]
                    [2]
                    [3]
   /////////////////////////////////////
  MATRIZ= [
          [1, 1, 1, 1],
          [4, 4, 2, 2],
          [2, 1, -1, 0]
          ];
            ONDE A RESPOSTA É: 
                    [-1]
                    [1]
                    [1]
  /////////////////////////////////////
  MATRIZ= [
          [3, 4, 11],
          [4, -3, -2]
          ];
            ONDE A RESPOSTA É: 
                    [1]
                    [2]
                  
   */

//////////////////////////////////////////////////////////////////////
/**
   * Entrada de Matriz Gauss-Jordan: 
   * 
   MATRIZ= [
          [2, -3, 4],
          [-1, 5, 5]
          ];
            ONDE A RESPOSTA É: 
                  |1  0 | 5 |
                  |0  1 | 2 |
  /////////////////////////////////////
   MATRIZ= [
          [1, 4, 6],
          [2, -2, 3]
          ];
            ONDE A RESPOSTA É: 
                  |1  0 | 12/5 |
                  |0  1 | 9/10 |
  /////////////////////////////////////              
   MATRIZ= [
          [2, -3, 1, -16],
          [1, -1, 0, -4], 
          [2, -2, 3, -23]
          ];
            ONDE A RESPOSTA É: 
                  |1  0  0|  4 |
                  |0  1  0|  3 |
                  |0  0  1| -5 |
   */
//////////////////////////////////////////////////////////////////////
/**
   * Entrada de Matriz Gauss-Jordan com inversa: 
   * 
   MATRIZ= [
          [1, 0, 2],
          [1, 2, 1],
          [0, 1, 2],
          ];
            ONDE A RESPOSTA É: 
                  | 3/5 | 2/5 | -4/5 |
                  |-2/5 | 2/5 |  1/5 |
                  | 1/5 |-1/5 |  2/5 |
  
  /////////////////////////////////////
   MATRIZ= [
          [1, 1, 2],
          [2, 0, 2],
          [0, 2, 1],
          ];
            ONDE A RESPOSTA É: 
                  | 0 | 3/2 | 1 |
                  | 1 |  2  | 1 |
                  | 0 | -1  |-1 |
  /////////////////////////////////////              
   MATRIZ= [
          [2, 1, -1],
          [5, 2, -3], 
          [0, 2, 1]
          ];
            ONDE A RESPOSTA É: 
                  |  8 | -3  | 1 |
                  | -5 |  2  | 1 |
                  | 10 | -4  |-1 |
   */
