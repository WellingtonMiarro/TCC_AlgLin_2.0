class Gauss {
  gauss_dois(matriz) {
    let linha = matriz.length;
    let coluna = matriz[0].length;
    let i, j;
    let matriz2 = matriz;
    let matrizImprima = this.criarMatriz(linha, coluna);
    let matrizinicial = this.criarMatriz(linha, coluna);

    for (i = 0; i < linha; i++) {
      for (j = 0; j < coluna; j++) {
        matrizinicial[i][j] = matriz2[i][j]; //esse "matrizinicial" serve para guardar os valores de entrada, pra utilizar nas operações
      }
    }

    console.log("\n\nMatriz M\n\n");
    console.table(matriz2);

    console.log("\n\nAEG ou AGJ ida");
    let cont,
      ver = 0;

    for (
      cont = 0;
      cont < linha - 1;
      cont++ //Como é ordem 2, cont > 1 quer dizer "vai até a penúltima linha, esse "1" é o tamanho da matriz, deveter algum comando "lenght" ou "size" que gneraliza esse 1
    ) {
      let pivo = matriz2[cont][cont];
      for (
        i = cont + 1;
        i < linha;
        i++ //cont + 1 quer dizer "alguma linha abaixo do pivô que vou zerar o elemento da coluna do pivô"
      ) {
        console.log(
          "\n\nL",
          i + 1,
          " = ",
          pivo,
          "L",
          i + 1,
          " - ",
          matriz2[i][cont],
          "L",
          cont + 1
        );

        let eliminando = matriz2[i][cont]; //enquanto "pivo" é a variável q guarda o valor de referência para zerar os outros abaixo dele (nesse caso da "ida"), "eliminando" é exatamente o valor q vai zerar na multiplicação cruzada e posterior subtração

        for (j = 0; j < coluna; j++) {
          matriz2[i][j] = pivo * matriz2[i][j] - eliminando * matriz2[cont][j]; //Do artigo SIMPOCOMP e da teoria q vcs estudaram comigo e com Vini: |||Li <- pivô * Li - elimiminando * Lj|||, onde j representa a linha do pivô
          if (i == linha - 1) ver += matriz2[i][j];
        }
      }
      console.log("\n\nMatriz M\n\n");
      console.table(matriz2);
    }

    if (ver == 0)
      return console.error("LINHA ZARADA, NÃO É POSSÍVEL CONTINUAR!");

    console.log("\n\nKernel - AGJ volta"); //Confesso q estou confuso na "volta". Pra ordem 2 funcionou, mas pra ordem 3 algo não está batendo. Peço pra vcs analisarem

    for (
      cont = linha - 1;
      cont > 0;
      cont-- //cont = 1 vai virar cont = ordem da matriz de entrada
    ) {
      let pivo = matriz2[cont][cont];
      for (
        i = cont - 1;
        i >= 0;
        i-- //cont -1 quer dizer "alguma linha acima do pivô que vou zerar..."
      ) {
        console.log(
          "\n\nL",
          i + 1,
          " = ",
          pivo,
          "L",
          i + 1,
          " - ",
          matriz2[i][cont],
          "L",
          cont + 1
        );

        let eliminando = matriz2[i][cont]; //enquanto "pivo" é a variável q guarda o valor de referência para zeras os outros acima dele (nesse caso da "volta"), "eliminando" é exatamente o valor q vai zerar na multiplicação cruzada e posterior subtração

        for (j = 0; j < 2; j++) {
          matriz2[i][j] = pivo * matriz2[i][j] - eliminando * matriz2[cont][j]; //Do artigo SIMPOCOMP e da teoria q vcs estudaram comigo e com Vini: |||Li <- pivô * Li - elimiminando * Lj|||, onde j representa a linha do pivô
        }
      }
      console.log("\n\nMatriz M\n\n");
      console.table(matriz2);

      //Normalizando os vetores da matriz diagonal

      for (
        i = 0;
        i < linha;
        i++ //i < 2 vai virar i < ordem da matriz
      ) {
        let norm = matriz2[i][i]; //pq os elementos a diagonal principal estão sempre na mesma ordem de linha do que de coluna! Elementos m11, m22, m33, etc.
        for (
          j = 0;
          coluna < 2;
          j++ // j < 2 vai virar...
        ) {
          if (norm != 0) {
            matriz2[i][j] = matriz2[i][j] / norm; // "if(norm != 0)" evita divisões por zero. Acredito que devem fazer o mesmo com "pivo" e "eliminando". Onde o candidato a pivô é zero, ou pulamos a etapa (com esse teste "se(variável != 0)", ou trcamos as linhas de lugar, com o objetivo de o pivô não ser nulo, o que não é difícil fazer!
          }
        }
      }

      console.log("\n\nMatriz M normalizada = I\n\n");
      console.table(matriz2);

      let opt;

      opt = prompt(
        "Escolha qual operação fazer\n1) Resolver sistema linear\n2) Calcular o determinante\n3) obter a matriz inversa\n"
      );

      if (opt == 1) {
        console.log(
          "\n\nAqui consideramos que os coeficientes digitados por você são do sistema linear\n\n"
        );
        for (i = 0; i < 2; i++) {
          console.log(
            "{",
            matrizinicial[i][0],
            "x + ",
            matrizinicial[i][1],
            "y = s",
            i + 1
          );
          console.log("\n");
        }
        console.log(
          "\n\nOnde s1, s2, ... são respostas de cada equação do sistema"
        );

        let resp = []; //vetor q vai receber s1, s2, ... digitado pelo usuário

        for (i = 0; i < linha; i++) {
          resp[i] = prompt("Digite s", i + 1, ": ");
        }

        //Montando matriz completa: acrescentar uma coluna [s1, s2, ...] na matriz inicial
        let matrizcompletasistlin = this.criarMatriz(linha, coluna + 1);

        for (i = 0; i < linha; i++) {
          for (j = 0; j < coluna + 1; j++) {
            if (j < 2) {
              matrizcompletasistlin[i][j] = matrizinicial[i][j];
            } else {
              matrizcompletasistlin[i][j] = resp[i];
            }
          }
        }

        console.log("\n\nMatriz completa = I\n\n");

        console.log(matrizcompletasistlin);

        console.log("\n\nAEG ou AGJ ida");

        for (
          cont = 0;
          cont < linha - 1;
          cont++ //Como é ordem 2, cont > 1 quer dizer "vai até a penúltima linha, esse "1" é o tamanho da matriz, deveter algum comando "lenght" ou "size" que gneraliza esse 1
        ) {
          let pivo = matrizcompletasistlin[cont][cont];
          for (
            i = cont + 1;
            i < linha;
            i++ //cont + 1 quer dizer "alguma linha abaixo do pivô que vou zerar o elemento da coluna do pivô"
          ) {
            console.log(
              "\n\nL",
              i + 1,
              " = ",
              pivo,
              "L",
              i + 1,
              " - ",
              matrizcompletasistlin[i][cont],
              "L",
              cont + 1
            );

            let eliminando = matrizcompletasistlin[i][cont]; //enquanto "pivo" é a variável q guarda o valor de referência for zerar os outros abaixo dele (nesse caso da "ida"), "eliminando" é exatamente o valor q vai zerar na multiplicação cruzada e posterior subtração

            for (
              j = 0;
              j < coluna + 1;
              j++ // j < ordem da matriz + 1 coluna
            ) {
              matrizcompletasistlin[i][j] =
                pivo * matrizcompletasistlin[i][j] -
                eliminando * matrizcompletasistlin[cont][j]; //Do artigo SIMPOCOMP e da teoria q vcs estudaram comigo e com Vini: |||Li <- pivô * Li - elimiminando * Lj|||, onde j representa a linha do pivô
            }
          }
        }

        console.log("\n\nMatriz completa\n\n");

        console.table(matrizcompletasistlin);

        console.log("\n\nKernel - AGJ volta"); //Confesso q estou confuso na "volta". Pra ordem 2 funcionou, mas pra ordem 3 algo não está batendo. Peço pra vcs analisarem

        for (
          cont = linha - 1;
          cont > 0;
          cont-- //cont = 1 vai virar cont = ordem da matriz de entrada
        ) {
          let pivo = matrizcompletasistlin[cont][cont];
          for (
            i = cont - 1;
            i >= 0;
            i-- //cont -1 quer dizer "alguma linha acima do pivô que vou zerar..."
          ) {
            console.log(
              "\n\nL",
              i + 1,
              " = ",
              pivo,
              "L",
              i + 1,
              " - ",
              matrizcompletasistlin[i][cont],
              "L",
              cont + 1
            );

            let eliminando = matrizcompletasistlin[i][cont]; //enquanto "pivo" é a variável q guarda o valor de referência for zeras os outros acima dele (nesse caso da "volta"), "eliminando" é exatamente o valor q vai zerar na multiplicação cruzada e posterior subtração

            for (
              j = 0;
              j < coluna + 1;
              j++ // j = ordem da mateiz + 1 coluna
            ) {
              matrizcompletasistlin[i][j] =
                pivo * matrizcompletasistlin[i][j] -
                eliminando * matrizcompletasistlin[cont][j]; //Do artigo SIMPOCOMP e da teoria q vcs estudaram comigo e com Vini: |||Li <- pivô * Li - elimiminando * Lj|||, onde j representa a linha do pivô
            }
          }
          console.log("\n\nMatriz completa\n\n");
          console.table(matrizcompletasistlin);

          //Normalizando os vetores da matriz diagonal

          for (
            i = 0;
            i < linha;
            i++ //i < 2 vai virar i < ordem da matriz
          ) {
            let norm = matrizcompletasistlin[i][i]; //pq os elementos a diagonal principal estão sempre na mesma ordem de linha do que de coluna! Elementos m11, m22, m33, etc.
            for (
              j = 0;
              j < coluna + 1;
              j++ // j < 3 vai virar j < qtde de colunas da matriz completa
            ) {
              if (norm != 0) {
                matrizcompletasistlin[i][j] =
                  matrizcompletasistlin[i][j] / norm; // "se(norm != 0)" evita divisões por zero. Acredito que devem fazer o mesmo com "pivo" e "eliminando". Onde o candidato a pivô é zero, ou pulamos a etapa (com esse teste "se(variável != 0)", ou trcamos as linhas de lugar, com o objetivo de o pivô não ser nulo, o que não é difícil fazer!
              }
            }
          }

          console.log("\n\nMatriz completa final\n\n");
          for (i = 0; i < linha; i++) {
            for (j = 0; j < coluna + 1; j++) {
              console.log("[", matrizcompletasistlin[i][j], "]");
            }
            console.log("\n");
          }

          console.log(
            "\n\nResposta: x = ",
            matrizcompletasistlin[0][2],
            ", y = ",
            matrizcompletasistlin[1][2],
            "\n"
          );
        }
      } else if (opt == 2) {
        console.log(
          "\n\nBasta escalonar a matriz quadrada (AEG), até virar uma matriz triangular inferior"
        );
        console.log(
          "\n\nO determinante será a multiplicação dos elementos da diagonal principal"
        );
        console.log(
          "No entanto, estamos utilizando uma equação normalizada pelo pivô, ou seja,\n\n a cada interação devemos dividir pelo pivô anterior, o que resulta no determinante\n\nigual ao último valor da diagonal principal"
        );
        console.log("\n\nCalculando o determinante por triangulação: M = \n\n");
        console.table(matrizinicial);

        //Montando matriz det

        let matrizdet = matrizinicial;

        console.log("\n\nAEG ou AGJ ida");

        for (
          cont = 0;
          cont < linha;
          cont++ //Como é ordem 2, cont > 1 quer dizer "vai até a penúltima linha, esse "1" é o tamanho da matriz, deveter algum comando "lenght" ou "size" que gneraliza esse 1
        ) {
          let pivo = matrizdet[cont][cont];
          for (
            i = cont + 1;
            i < coluna;
            i++ //cont + 1 quer dizer "alguma linha abaixo do pivô que vou zerar o elemento da coluna do pivô"
          ) {
            console.log(
              "\n\nL",
              i + 1,
              " = ",
              pivo,
              "L",
              i + 1,
              " - ",
              matrizdet[i][cont],
              "L",
              cont + 1
            );

            let eliminando = matrizdet[i][cont]; //enquanto "pivo" é a variável q guarda o valor de referência for zerar os outros abaixo dele (nesse caso da "ida"), "eliminando" é exatamente o valor q vai zerar na multiplicação cruzada e posterior subtração

            for (j = 0; j < coluna; j++) {
              matrizdet[i][j] =
                pivo * matrizdet[i][j] - eliminando * matrizdet[cont][j]; //Do artigo SIMPOCOMP e da teoria q vcs estudaram comigo e com Vini: |||Li <- pivô * Li - elimiminando * Lj|||, onde j representa a linha do pivô
            }
          }
          console.log("\n\nMatriz escalonada\n\n");
          console.table(matrizdet);
          console.log("\n\nDeterminante = ", matrizdet[1][1], "\n"); //[1][1] vai virar [ordem][ordem]
        }
      } else if (opt == 3) {
        console.log(
          "\n\nfor inverter uma matriz, vamos utilizar AGJ e uma matriz identidade"
        );
        console.log("\n\nMatriz completa\n\n");

        //Montando matriz completa for inversão de matriz
        let matrizcompletainv = this.criarMatriz(linha, coluna * 2); // 4 aqui quer dizer "o dobro da ordem da matriz"
        for (
          i = 0;
          i < linha;
          i++ //i < 2 vai virar i < ordem
        ) {
          for (
            j = 0;
            j < coluna * 2;
            j++ //j = 4 vem de j = dobro de i, pois agregaremos uma matriz identidade á direita da matriz original, gerando uma matriz completa i x 2*i
          ) {
            if (j < 2) matrizcompletainv[i][j] = matrizinicial[i][j];
            else {
              //o condicional abaixo é ref a uma matriz identidade
              if (i == j - 2) matrizcompletainv[i][j] = 1.0;
              //j - 2 quer dizer j - ordem da matriz de entrada
              else matrizcompletainv[i][j] = 0.0;
            }
          }
        }

        console.log("\n\nMatriz escalonada\n\n");

        console.table(matrizcompletainv);

        console.log("\n\nAEG ou AGJ ida");

        for (
          cont = 0;
          cont < linha - 1;
          cont++ //Como é ordem 2, cont > 1 quer dizer "vai até a penúltima linha, esse "1" é o tamanho da matriz, deveter algum comando "lenght" ou "size" que gneraliza esse 1
        ) {
          let pivo = matrizcompletainv[cont][cont];
          for (
            i = cont + 1;
            i < linha;
            i++ //cont + 1 quer dizer "alguma linha abaixo do pivô que vou zerar o elemento da coluna do pivô"
          ) {
            console.log(
              "\n\nL",
              i + 1,
              " = ",
              pivo,
              "L",
              i + 1,
              " - ",
              matrizcompletainv[i][cont],
              "L",
              cont + 1
            );

            let eliminando = matrizcompletainv[i][cont]; //enquanto "pivo" é a variável q guarda o valor de referência for zerar os outros abaixo dele (nesse caso da "ida"), "eliminando" é exatamente o valor q vai zerar na multiplicação cruzada e posterior subtração

            for (
              j = 0;
              j < coluna * 2;
              j++ //j = 4 é o mesmo que j = dobro da qtde de linhas, ou ordem da matriz de entrada
            ) {
              matrizcompletainv[i][j] =
                pivo * matrizcompletainv[i][j] -
                eliminando * matrizcompletainv[cont][j]; //Do artigo SIMPOCOMP e da teoria q vcs estudaram comigo e com Vini: |||Li <- pivô * Li - elimiminando * Lj|||, onde j representa a linha do pivô
            }
          }
          console.log("\n\nMatriz completa\n\n");
          console.table(matrizcompletainv);
        }

        console.log("\n\nAGJ volta"); //Confesso q estou confuso na "volta". Pra ordem 2 funcionou, mas pra ordem 3 algo não está batendo. Peço pra vcs analisarem

        for (
          cont = linha - 1;
          cont > 0;
          cont-- //cont = 1 vai virar cont = ordem da matriz de entrada, menos 1 (linha do pivô sempre acima, na ida)
        ) {
          let pivo = matrizcompletainv[cont][cont];
          for (
            i = cont - 1;
            i >= 0;
            i-- //cont -1 quer dizer "alguma linha acima do pivô que vou zerar..."
          ) {
            console.log(
              "\n\nL",
              i + 1,
              " = ",
              pivo,
              "L",
              i + 1,
              " - ",
              matrizcompletainv[i][cont],
              "L",
              cont + 1
            );

            let eliminando = matrizcompletainv[i][cont]; //enquanto "pivo" é a variável q guarda o valor de referência for zeras os outros acima dele (nesse caso da "volta"), "eliminando" é exatamente o valor q vai zerar na multiplicação cruzada e posterior subtração

            for (
              j = 0;
              j < coluna * 2;
              j++ //Lembrando: na matriz inversa j = 2*i = 2*ordem
            ) {
              matrizcompletainv[i][j] =
                pivo * matrizcompletainv[i][j] -
                eliminando * matrizcompletainv[cont][j]; //Do artigo SIMPOCOMP e da teoria q vcs estudaram comigo e com Vini: |||Li <- pivô * Li - elimiminando * Lj|||, onde j representa a linha do pivô
            }
          }
          console.log("\n\nMatriz completa\n\n");
          console.table(matrizcompletainv);
        }

        //Normalizando os vetores da matriz diagonal

        for (
          i = 0;
          i < linha;
          i++ //i < 2 vai virar i < ordem da matriz
        ) {
          let norm = matrizcompletainv[i][i]; //pq os elementos a diagonal principal estão sempre na mesma ordem de linha do que de coluna! Elementos m11, m22, m33, etc.
          for (j = 0; j < coluna * 2; j++) {
            if (norm != 0) {
              matrizcompletainv[i][j] = matrizcompletainv[i][j] / norm; // "se(norm != 0)" evita divisões por zero. Acredito que devem fazer o mesmo com "pivo" e "eliminando". Onde o candidato a pivô é zero, ou pulamos a etapa (com esse teste "se(variável != 0)", ou trcamos as linhas de lugar, com o objetivo de o pivô não ser nulo, o que não é difícil fazer!
            }
          }
        }

        console.log("\n\nMatriz completa final\n\n");

        console.table(matrizcompletainv);

        console.log("\n\nA inversa de M é: \n\n");
        for (i = 0; i < linha; i++) {
          for (
            j = 0;
            j < coluna;
            j++ //escrevendo só a parte da matriz inversa!
          ) {
            matrizImprima[i][j] = matrizcompletainv[i][j + coluna];
          }
        }
        console.table(matrizImprima);
      } else {
        console.log("\n\nSomente opções 1, 2 ou 3");
      }
    }
  }
  criarMatriz(linha, coluna) {
    let matriz = new Array(linha);
    for (let i = 0; i < linha; i++) {
      matriz[i] = Array(coluna);
    }
    return matriz;
  }
}

const Elimina = new Gauss();

let matriz = [
  [2, 3, 7],
  [3, 5, 9],
  [1, 2, 2],
];

Elimina.gauss_dois(matriz);
