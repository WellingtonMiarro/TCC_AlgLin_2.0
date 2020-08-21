class Gauss {
  menu() {
    let opt;
    opt = prompt(
      "Escolha qual operação fazer\n1) Resolver sistema linear\n2) Calcular o determinante\n3) Obter a matriz inversa\n"
    );
    opt = parseInt(opt);
    switch (opt) {
      case 1:
        this.sistemaLinear(this.receberEntrada());
        break;

      case 2:
        this.determinate(this.receberEntrada());
        break;

      case 3:
        this.inversa(this.receberEntrada());
        break;
      default:
        console.error("COMANDO INVÁLIDO");
    }
  }
  receberEntrada() {
    let mensagem;
    let ordem = prompt("Informe a ordem da matriz");
    let matriz = this.criarMatriz(ordem, ordem);
    for (let i = 0; i < ordem; i++) {
      for (let j = 0; j < ordem; j++) {
        mensagem = "Digite m" + (i + 1) + (j + 1);
        matriz[i][j] = parseFloat(prompt(mensagem));
      }
    }
    return matriz;
  }
  ida(matriz) {
    let linha = matriz.length;
    let coluna = matriz[0].length;
    let i, j;
    let matriz2 = matriz;
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
          if (i == linha - 1 && cont == linha - 2) ver += matriz2[i][j];
        }
      }

      console.log("\n\nMatriz M\n\n");
      console.table(matriz2);
    }

    if (ver == 0 || matriz2[cont][cont] == 0)
      return console.error("LINHA ZARADA, NÃO É POSSÍVEL CONTINUAR!");
    return matriz2;
  }

  volta(matriz2) {
    let linha = matriz2.length;
    let coluna = matriz2[0].length;
    let i, j, cont;
    let matrizTeste = this.criarMatriz(linha, coluna);
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

        for (j = 0; j < coluna; j++) {
          matriz2[i][j] = pivo * matriz2[i][j] - eliminando * matriz2[cont][j]; //Do artigo SIMPOCOMP e da teoria q vcs estudaram comigo e com Vini: |||Li <- pivô * Li - elimiminando * Lj|||, onde j representa a linha do pivô
        }
      }
      console.log("\n\nMatriz M\n\n");
      console.table(matriz2);
    }

    matriz2 = this.normaliza(matriz2);

    console.log("\n\nMatriz M normalizada = I\n\n");
    console.table(matriz2);
    return matriz2;
  }

  sistemaLinear(matrizinicial) {
    let linha = matrizinicial.length;
    let coluna = matrizinicial[0].length;
    let i, j;
    console.log(
      "\n\nAqui consideramos que os coeficientes digitados por você são do sistema linear\n\n"
    );
    for (i = 0; i < linha; i++) {
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
      let mensagem = "Digite s" + (i + 1) + ": ";
      resp[i] = parseFloat(prompt(mensagem));
    }

    //Montando matriz completa: acrescentar uma coluna [s1, s2, ...] na matriz inicial
    let matrizcompletasistlin = this.criarMatriz(linha, coluna + 1);

    for (i = 0; i < linha; i++) {
      for (j = 0; j < coluna + 1; j++) {
        if (j < coluna) {
          matrizcompletasistlin[i][j] = matrizinicial[i][j];
        } else {
          matrizcompletasistlin[i][j] = resp[i];
        }
      }
    }
    console.log("\n\nMatriz completa = I\n\n");

    console.log(matrizcompletasistlin);

    matrizcompletasistlin = this.volta(this.ida(matrizcompletasistlin));

    console.log("\n\nMatriz completa final\n\n");

    console.table(matrizcompletasistlin);

    for (i = 0; i < linha; i++) {
      console.log(
        "\n\nResposta: x" + (i + 1),
        " = ",
        matrizcompletasistlin[i][matrizcompletasistlin[0].length - 1]
      );
    }
  }

  determinate(matrizinicial) {
    let linha = matrizinicial.length;
    let coluna = matrizinicial[0].length;
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
    let matrizdet = this.ida(matrizinicial);
    console.log("\n\nDeterminante = ", matrizdet[linha - 1][coluna - 1], "\n"); //[1][1] vai virar [ordem][ordem]
  }

  inversa(matrizinicial) {
    let i, j;
    let linha = matrizinicial.length;
    let coluna = matrizinicial[0].length;
    console.log(
      "\n\nfor inverter uma matriz, vamos utilizar AGJ e uma matriz identidade"
    );
    console.log("\n\nMatriz completa\n\n");
    let matrizImprima = this.criarMatriz(linha, coluna);
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
        if (j < coluna) matrizcompletainv[i][j] = matrizinicial[i][j];
        else {
          //o condicional abaixo é ref a uma matriz identidade
          if (i == j - coluna) matrizcompletainv[i][j] = 1.0;
          //j - 2 quer dizer j - ordem da matriz de entrada
          else matrizcompletainv[i][j] = 0.0;
        }
      }
    }
    console.log("\n\nMatriz escalonada\n\n");

    console.table(matrizcompletainv);

    matrizcompletainv = this.volta(this.ida(matrizcompletainv));

    //Normalizando os vetores da matriz diagonal

    console.log("\n\nMatriz completa final\n\n");

    console.table(matrizcompletainv);

    console.log("\n\nA inversa de M é: \n\n");

    matrizcompletainv = this.normaliza(matrizcompletainv);

    for (i = 0; i < linha; i++) {
      for (j = 0; j < coluna; j++) {
        //escrevendo só a parte da matriz inversa!
        matrizImprima[i][j] = matrizcompletainv[i][j + coluna];
      }
    }
    console.table(matrizImprima);
  }

  normaliza(matriz) {
    let i, j;
    let linha = matriz.length;
    let coluna = matriz[0].length;
    for (
      i = 0;
      i < linha;
      i++ //i < 2 vai virar i < ordem da matriz
    ) {
      let norm = matriz[i][i]; //pq os elementos a diagonal principal estão sempre na mesma ordem de linha do que de coluna! Elementos m11, m22, m33, etc.
      for (j = 0; j < coluna; j++) {
        if (norm != 0) {
          matriz[i][j] = matriz[i][j] / norm; // "se(norm != 0)" evita divisões por zero. Acredito que devem fazer o mesmo com "pivo" e "eliminando". Onde o candidato a pivô é zero, ou pulamos a etapa (com esse teste "se(variável != 0)", ou trcamos as linhas de lugar, com o objetivo de o pivô não ser nulo, o que não é difícil fazer!
        }
      }
    }
    return matriz;
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
Elimina.menu();
