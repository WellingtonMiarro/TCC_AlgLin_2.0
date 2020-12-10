/*          if (codigoErro != 2) {
			if (eliminando != 0) {
            console.log( "\n\nL",i + 1, " = ", pivo,"L", i + 1, " - ", matriz2[i][cont], "L", cont + 1);
            for (j = 0; j < coluna; j++) {
                matriz2[i][j] = pivo * matriz2[i][j] - eliminando * matriz2[cont][j]; //Do artigo SIMPOCOMP e da teoria q vcs estudaram comigo e com Vini: |||Li <- pivô * Li - elimiminando * Lj|||, onde j representa a linha do pivô
              if (matriz2[i][j] == -0) matriz2[i][j] = 0;
              else if (codigoErro != 1 && matriz2[i][j] == 0) ver++; //Aqui ele faz o somatorio até a utilma coluna.
            }
          }
        } else{
    	   if (eliminando != 0) {
            console.log( "\n\nL",i + 1, " = ", "L", i + 1, " - (", matriz2[i][cont], "/", pivo, ").L", cont + 1);
            for (j = 0; j < coluna; j++) {
		 	matriz2[i][j] = matriz2[i][j] - (eliminando / pivo) * matriz2[cont][j]; //Caso o codigo for igual a 2, que identifica nesse caso o calculo determinante, o metodo de elimanção sofre essa alteração, caso não, ele vai usar o método da condição acima
			if (matriz2[i][j] == -0) matriz2[i][j] = 0;
              else if (codigoErro != 1 && matriz2[i][j] == 0) ver++; //Aqui ele faz o somatorio até a utilma coluna.
               }
             }
		   } */

       class Gauss {
        menu() {
          let opt;
          opt = prompt(
            "Escolha qual operação fazer:\n1) Resolver sistema linear\n2) Calcular o determinante\n3) Obter a matriz inversa\n4) Dependência Linear"
          );
         
          opt = parseInt(opt);
          switch (opt) {
            case 1:
              this.sistemaLinear(this.receberEntrada(1));
              break;
    
            case 2:
              this.determinante(this.receberEntrada(2));
              break;
    
            case 3:
              this.inversa(this.receberEntrada(3));
              break;
          
            case 4:
              this.verificarDependencia(this.receberEntrada(4));
              break;
    
              default:
              console.error("COMANDO INVÁLIDO");
          }
        }
    
        receberEntrada(codigoOp) {
          let mensagem;        
          
          
          let tLinhas = prompt("Informe a ordem da matriz\n Quantidade de Linhas: ");
          let tColunas = prompt("Informe a ordem da matriz\n Quantidade de Colunas: ");
          
          while((codigoOp == 2 || codigoOp == 3) && tLinhas != tColunas){
            alert("PARA ESSE MÉTODO A ORDEM DA MATRIZ TEM QUE SER QUADRADA");
            tLinhas = prompt("Informe a ordem da matriz\n Quantidade de Linhas: ");
            tColunas = prompt("Informe a ordem da matriz\n Quantidade de Colunas: ");
          }
    
          let matriz = this.criarMatriz(tLinhas, tColunas);
    
          for (let i = 0; i < tLinhas; i++) {
            for (let j = 0; j < tColunas; j++) {
              mensagem = "Digite M" + "(" + (i + 1) + "," + (j + 1) + ")";
              matriz[i][j] = parseFloat(prompt(mensagem));
            }
          }
    
    
    
    
          return matriz;
        }
    
        verificarDependencia(matriz){//Verifica se a alguma linha zerada após a eliminação gaussiana
          let linha = matriz.length;
          let coluna = matriz[0].length;
          let verificaDep = 0;
          
          matriz = this.ida(matriz, 1);
    
          for(let i = 0; i < linha; i++){
            for(let j = 0; j < coluna; j++){
              if(matriz[i][j] == 0)verificaDep++;
            }
            if(verificaDep == coluna)return console.log("VETORES LINEARMENTE DEPENDENTES (LD)");
            verificaDep = 0;
          }
          return console.log("VETORES LINEARMENTE INDEPENDENTES (LI)");
        }
    
        ida(matriz, codigoErro) {
          let linha = matriz.length;
          let coluna = matriz[0].length;
          let i, j, contTrocaLinhas = 0;
          let doisObjetos; //Exclusivo da determinante
          let matriz2 = matriz;
          let matrizinicial = this.criarMatriz(linha, coluna);
    
          for (i = 0; i < linha; i++) {
            for (j = 0; j < coluna; j++) {
              matrizinicial[i][j] = matriz2[i][j]; //esse "matrizinicial" serve para guardar os valores de entrada, pra utilizar nas operações
            }
          }
    
          console.log("\n\nMatriz M\n\n");
          console.table(matriz2);
    
          console.log("\n\n IDA - AEG");
          let cont,
            ver = -1;
    
          for (cont = 0; cont < linha - 1; cont++) {
            //Como é ordem 2, cont > 1 quer dizer "vai até a penúltima linha, esse "1" é o tamanho da matriz, deveter algum comando "lenght" ou "size" que gneraliza esse 1
    
            let pivo = matriz2[cont][cont];
            if (pivo == 0) {
              matriz2 = this.trocaLinhas(matriz2, cont); //Caso o pivo for igual a zero é chamado o metodo para trocar linhas.
              pivo = matriz2[cont][cont];
              contTrocaLinhas++;
            }
    
            for (i = cont + 1; i < linha; i++) {
              //cont + 1 quer dizer "alguma linha abaixo do pivô que vou zerar o elemento da coluna do pivô"
    
              let eliminando = matriz2[i][cont]; //enquanto "pivo" é a variável q guarda o valor de referência para zerar os outros abaixo dele (nesse caso da "ida"), "eliminando" é exatamente o valor q vai zerar na multiplicação cruzada e posterior subtração
              if (eliminando != 0) {
                if(codigoErro != 2) console.log( "\n\nL",i + 1, " = ", pivo,"L", i + 1, " - ", matriz2[i][cont], "L", cont + 1);
          else console.log( "\n\nL",i + 1, " = ", "L", i + 1, " - (", matriz2[i][cont], "/", pivo, ").L", cont + 1);
                //Caso o codigo for igual a 2, que identifica nesse caso o calculo determinante, o metodo de elimanção sofre essa alteração, caso não, ele vai usar o método da condição acima
          for (j = 0; j < coluna; j++) {
                  if (codigoErro != 2)
                    matriz2[i][j] =
                      pivo * matriz2[i][j] - eliminando * matriz2[cont][j];
                  //Do artigo SIMPOCOMP e da teoria q vcs estudaram comigo e com Vini: |||Li <- pivô * Li - elimiminando * Lj|||, onde j representa a linha do pivô
                  else
                    matriz2[i][j] =
                      matriz2[i][j] - (eliminando / pivo) * matriz2[cont][j]; //Caso o codigo for igual a 2, que identifica nesse caso o calculo determinante, o metodo de elimanção sofre essa alteração, caso não, ele vai usar o método da condição acima
                  if (matriz2[i][j] == -0) matriz2[i][j] = 0;
                  else if (codigoErro != 1 && matriz2[i][j] == 0) ver++; //Aqui ele faz o somatorio até a utilma coluna.
                }
              }
             
            }
           
            if(cont < linha -2){
              console.log("\n\nMatriz Intermediária\n\n");
              this.imprima(matriz2);
            }
           
    
    
            if (ver == coluna - 1 || pivo == 0) {
              this.imprima(matriz2);
    
              switch (codigoErro) {
                case 1:
                  return console.error("O sistema não é determinado!");
                case 2:
                  return console.error("O determinante é nulo!");
                case 3:
                  return console.error("Essa matriz não admite inversa!");
              }
            }
            ver = -1;
          }
    
          console.log("\n\nMatriz M\n\n");
          this.imprima(matriz2);
    
          if (codigoErro == 2) {
            // Aqui retorna a matriz e contador de troca de linhas para determinante
            doisObjetos = [matriz2, contTrocaLinhas];
            return doisObjetos;
          }
          return matriz2;
        }
        volta(matriz2, codigoErro) {
          let linha = matriz2.length;
          let coluna = matriz2[0].length;
          let i,
            j,
            cont,
            ver = -1;
          console.log("\n\n VOLTA - AGJ "); //Confesso q estou confuso na "volta". Pra ordem 2 funcionou, mas pra ordem 3 algo não está batendo. Peço pra vcs analisarem
    
          for (cont = linha - 1; cont > 0; cont--) {
            //cont = 1 vai virar cont = ordem da matriz de entrada
    
            let pivo = matriz2[cont][cont];
            if (pivo == 0) matriz2 = this.trocaLinhas(matriz2, cont); //Caso o pivo for igual a zero é chamado o metodo para trocar linhas.
    
            for (i = cont - 1; i >= 0; i--) {
              //cont -1 quer dizer "alguma linha acima do pivô que vou zerar...")
    
              let eliminando = matriz2[i][cont]; //enquanto "pivo" é a variável q guarda o valor de referência para zeras os outros acima dele (nesse caso da "volta"), "eliminando" é exatamente o valor q vai zerar na multiplicação cruzada e posterior subtração
              if (eliminando != 0) {
                console.log("\n\nL",i + 1," = ",pivo,"L", i + 1, " - ", matriz2[i][cont], "L",cont + 1);
                for (j = 0; j < coluna; j++) {
                  matriz2[i][j] =
                    pivo * matriz2[i][j] - eliminando * matriz2[cont][j]; //Do artigo SIMPOCOMP e da teoria q vcs estudaram comigo e com Vini: |||Li <- pivô * Li - elimiminando * Lj|||, onde j representa a linha do pivô
                  if (matriz2[i][j] == -0) matriz2[i][j] = 0;
                  if (codigoErro == 1 && j < coluna - 1 && matriz2[i][j] == 0) ver++;
                  else if (codigoErro != 1 && matriz2[i][j] == 0) ver++;
                }
              }
             
            }
           
            if(cont > 1){
              console.log("\n\nMatriz Intermediária\n\n");
              this.imprima(matriz2);
            }
    
    
            if (ver == coluna - 1 || pivo == 0) {
              console.table(matriz2);
              switch (codigoErro) {
                case 1:
                  return console.error("O sistema não é determinado!");
                case 2:
                  return console.error("O determinante é nulo!");
                case 3:
                  return console.error("Essa matriz não admite inversa!");
              }
            }
            ver = -1;
    
         
    
          }
    
       
    
          console.log("\n\nMatriz M\n\n");
          this.imprima(matriz2);
    
          matriz2 = this.normaliza(matriz2);
          console.log("\n\nMatriz M normalizada\n\n");
          this.imprima(matriz2);
          
          return matriz2;
        }

        trocaLinhas(matriz, posPivo) {
          // Esse metodo troca a atual linha do pivo pela de baixo, caso a
          let linha = matriz.length;
          let coluna = matriz[0].length;
          let aux,
            linhaOk = -1;
    
          // if(idaOuVolta == 1)inicio = 0;// Se for na ida vai trocar de cima para baixo
          //else inicio = coluna - 1;// Se for na volta vai trocar de baixo para cima
    
          for (let i = posPivo + 1; i < linha; i++) {
            if (matriz[i][posPivo] != 0) linhaOk = i;
          }
          if (linhaOk == -1) return matriz; // Caso não seja possivel trocar linhas
    
          for (let j = 0; j < coluna; j++) {
            aux = matriz[linhaOk][j];
            matriz[linhaOk][j] = matriz[posPivo][j];
            matriz[posPivo][j] = aux;
          }
          console.log("PIVÔ IGUAL A ZERO");
          console.log(
            "LINHA " + (posPivo + 1) + " TROCOU COM  A LINHA " + (linhaOk + 1)
          );
          this.imprima(matriz);
          return matriz;
        }
        sistemaLinear(matrizinicial) {
          let linha = matrizinicial.length;
          let coluna = matrizinicial[0].length;
          let i, j, equacao = "{";
          let resp = []; //vetor q vai receber s1, s2, ... digitado pelo usuário
    
          for (i = 0; i < linha; i++) {
            let mensagem = "Digite s" + (i + 1) + ": ";
            resp[i] = parseFloat(prompt(mensagem));
          }
    
    
          for (i = 0; i < linha; i++) {
            for (j = 0; j < coluna; j++) {
              if (j != coluna - 1)
                equacao += matrizinicial[i][j] + "x" + (j + 1) + " + ";
              else equacao += matrizinicial[i][j] + "x" + (j + 1) + " ";
            }
            equacao += "= " + (resp[i]);
            console.log(equacao);
            equacao = "{";
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
     
    
          console.log(matrizcompletasistlin);
    
          matrizcompletasistlin = this.volta(this.ida(matrizcompletasistlin, 1), 1);
    
          for (i = 0; i < linha; i++) {
            console.log(
              "\n\nResposta: x" + (i + 1),
              " = ",
              matrizcompletasistlin[i][matrizcompletasistlin[0].length - 1]
            );
          }
        }
        determinante(matrizinicial) {
          let linha = matrizinicial.length;
          let recebeObjeto;
         
      
          //Montando matriz det
          recebeObjeto = this.ida(matrizinicial, 2);
          let matrizdet = recebeObjeto[0];
          let somatorio = 1;
          for (let i = 0; i < linha; i++) {
            //Somatorio da diagonal principal.
            somatorio *= matrizdet[i][i];
          }
          if (recebeObjeto[1] != 0) {
            //invertendo o sinal de acordo com a quantidade de vezes que trocou de linhas
            if (recebeObjeto[1] / 2 != 0) somatorio *= -1;
          }
          somatorio = somatorio.toFixed(1);
          console.log("\n\nDeterminante = ", somatorio, "\n"); //[1][1] vai virar [ordem][ordem]
        }


        inversa(matrizinicial) {
          let i, j;
          let linha = matrizinicial.length;
          let coluna = matrizinicial[0].length;
        
          let matrizImprima = this.criarMatriz(linha, coluna);
          //Montando matriz completa for inversão de matriz
          let matrizcompletainv = this.criarMatriz(linha, coluna * 2); // 4 aqui quer dizer "o dobro da ordem da matriz"
          for ( i = 0;i < linha;i++ ) {//i < 2 vai virar i < ordem
            for (j = 0;j < coluna * 2; j++) { //j = 4 vem de j = dobro de i, pois agregaremos uma matriz identidade á direita da matriz original, gerando uma matriz completa i x 2*i
    
              if (j < coluna) matrizcompletainv[i][j] = matrizinicial[i][j];
              else {
                //o condicional abaixo é ref a uma matriz identidade
                if (i == j - coluna) matrizcompletainv[i][j] = 1.0;
                //j - 2 quer dizer j - ordem da matriz de entrada
                else matrizcompletainv[i][j] = 0.0;
              }
            }
          }
         
    
          matrizcompletainv = this.volta(this.ida(matrizcompletainv, 3), 3);
    
          //Normalizando os vetores da matriz diagonal
          
         

          console.log("\n\nA inversa de M é: \n\n");
    
         
    
          for (i = 0; i < linha; i++) {
            for (j = 0; j < coluna; j++) {
              //escrevendo só a parte da matriz inversa!
              matrizImprima[i][j] = matrizcompletainv[i][j + coluna];
            }
          }
          this.imprima(matrizImprima);
        }

        normaliza(matriz) {
          console.log("NORMALIZAÇÃO");
          let i, j, cont = 0;
          let linha = matriz.length;
          let coluna = matriz[0].length;
          for (i = 0; i < linha; i++) { //i < 2 vai virar i < ordem da matriz
            console.log("\n\nL",i + 1," = ","L", i + 1, " / ", matriz[i][cont]);
            let norm = matriz[i][i]; //pq os elementos a diagonal principal estão sempre na mesma ordem de linha do que de coluna! Elementos m11, m22, m33, etc.
            for (j = 0; j < coluna; j++) {
              if (norm != 0) {
                matriz[i][j] = matriz[i][j] / norm; // "se(norm != 0)" evita divisões por zero. Acredito que devem fazer o mesmo com "pivo" e "eliminando". Onde o candidato a pivô é zero, ou pulamos a etapa (com esse teste "se(variável != 0)", ou trcamos as linhas de lugar, com o objetivo de o pivô não ser nulo, o que não é difícil fazer!
              }
            }
            cont++;
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
        imprima(matriz) {
          //imprimi as matrizes arredondadas
          let linha = matriz.length;
          let coluna = matriz[0].length;
          let novaMatriz = this.criarMatriz(linha, coluna);
          for (let i = 0; i < linha; i++) {
            for (let j = 0; j < coluna; j++) {
              novaMatriz[i][j] = matriz[i][j].toFixed(3);
            }
          }
    
          console.table(novaMatriz);
        }
    
    }
    
    const Elimina = new Gauss();
    Elimina.menu();
    