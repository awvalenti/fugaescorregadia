'<>--)( } Fuga Escorregadia { )(--<>'

CONST meiopratico = -1
'CONST pratico = -1
'Deixam o jogo rapido, pra testar
'meio - tira a apresentacao e a historia
'pratico - tira tambem o Tempo e as musicas

'==========
'A fazeres
'==========
'
'-Quem sabe: -transformar os posIN, TL e IS em um arranjo
'            -juntar as "tela"s tambem
'            -fazer uma funcao pra ver se duas var do tipo Coord sao iguais
'
'-parte massante: comentar todo o codigo e adentar com 2 espacos
'-fazer a nova adentacao pros IFs (foda!), e aproveitar pra tirar todas as
' verificacoes de se a var e' V antes de torna'-la V
'-fazer os prints com ; (sem pular linha)
'-Ver se coloca o nego' do quadradinho envolvendo o treco selecionado no editor
'
'-Tornar o editor mais amigavel, colocando msgs quando nao der pra salvar
' e coisas assim
'-ver se coloca pro texto rolante pegar qq pers (aleat)
'-Olhar novamente o Beta e conferir se aki esta' tudo atualizado
'-Talvez por algum efeito no EncherTela (tipo um espiral)
'-por sons na hora de teletransportar
'-talvez fazer um TextoFujao para as msgs do jogo (tipo jogadas/pontos/fase)
'-colocar q a apresentacao aparece de novo quando zera, ou algo assim
'
'-Ver se desenha melhor os que atualmente estao "desinteressantes"
'-Redesenhar o Beto, melhorando o cabelo dele
'-Ver se tira fora o objeto 10, substituindo-o pelo 9
'-Mudar as coisas que fecham o jogo quando da' erro
'-Fazer o algoritmo de salvar tudo o que j† pegou (bateria)
'-Ver se termina de desenhar os caras
'-Depois de feitas as fases, tirar o qtfases e por numfases no lugar, alem
' dos TD's e pratico's
'-Colocar os acentos

'Acelera o jogo, fazendo as variaveis serem, por padrao, do tipo inteiro
DEFINT A-Z


'Consts ?s: maxfases, qtfases

'===================
'Inicio - Constantes
'===================


  '-------------------------------------------------
  'Cores - definidas aki e usadas em todo o programa
  '-------------------------------------------------
  'Consts de cores - de # pra portugues
  'padrao: na maior parte das coisas, como textos
  'cursor: no cursor que aparece na tela
  'tabela: pra escrever as tabelas
  'hist  : no texto da historia dos pers
  'clara : somando-a com outra cor, obtem-se sua versao clara
  CONST Preta = 0, Azul = 1, Verde = 2, Ciano = 3, Vermelha = 4, Roxo = 5, Marrom = 6, Cinza = 7, Clara = 8, Amarela = Marrom + Clara, Branca = Cinza + Clara
  CONST corpadrao = Branca, corcursor = Vermelha, cortabela = Ciano, corhist = Ciano, corquadr1 = Amarela, corquadr2 = Vermelha
                                                                                                 'akicor

  '----------------------------------------
  'Personagens - coisas relacionado a eles
  '----------------------------------------
  '#s de pers
  '  tot: totais, in: iniciais, sec: secretos
  'primeirosec: o codigo do 1o personagem que e' secreto
  'numpsgin: # inicial de pers
  CONST numpsgin = 9, numpsgsec = 5, numpsgtot = numpsgin + numpsgsec, primeirosec = numpsgin + 1

  'Chamando os personagens pelo nome (simplificado) em vez do numero, pra
  'ficar mais conveniente
  CONST Black = 1, Brown = 2, Sir = 3, Nois2 = 4, Mr = 5, Rm = 6, Decepa = 7, ET = 8, Beto = 9
  CONST Melo = primeirosec, I.S. = primeirosec + 1, Homero = primeirosec + 2, nada = numpsgtot - 1, Andre = numpsgtot

  '-----------------------------------------------------------
  'Apresentacao/EscolherCarinha - coisas ligadas a essas telas
  '-----------------------------------------------------------
  'ColOndePara: coluna em que o texto rolante para de ir pra esquerda
  'linhameio: linha em que se escrevem os chars dos pers
  '           valores X e Y de:
  '           e: esquerda, d: direita, c: cima, b: baixo, m: meio
  'linhanome: a linha em que se escreve o nome do pers
  'ymv e' o Y do meio verdadeiro, ym e' o "pratico"
  CONST Escorregadia$ = "  ESCORREGADIA  ", ColOndePara = 30, linhameio = 8, linhanome = linhameio + 6, pi = 3.141593
  CONST xm = 160, xe = xm - 30, xd = xm + 30
  CONST ymv = 100, ym = ymv + 43, yc = ym - 25, yb = ym + 25


  '--------------
  'Fase - numeros
  '--------------
  'qtfases e' "temporario", enquanto as
  '<valor de maxfases aki> fases nao estao feitas
  CONST numfases = 3, maxfases = 30, qtfases = maxfases


  '-----------------
  'Nao identificadas e outras
  '-----------------
  CONST ujs = 24 + 4 * qtfases
  'Verdadeiro e Falso
  CONST V = -1, F = 0
  'IntermitenciaCursor: o tempo que leva pra ele trocar de cor
  CONST IntermitenciaCursor = .4


  '------------------------------------------
  'Salvada - tudo relacionado a salvar o jogo
  '------------------------------------------
  'tudo o que tem "salvo" no nome e' ligado a salvar o jogo
  'extfase: extensao usada em fases editaveis
  'extprot: extensao usada em fases protegidas
  'tamsalvo: o tamanho em bytes que uma salvada ocupa
  'sv: o comeco do nome do jogo salvo
  CONST tamsalvo = (ujs + 31) * 2
  CONST extfase$ = ".FFE", extprot$ = ".PRT", sv$ = "FUGA.SV"

'===================
'Fim - constantes
'===================

'Define o tipo coordenada
TYPE Coord
  l AS INTEGER
  c AS INTEGER
END TYPE

'Define o tipo texto fujao - usado em ocasioes especiais...
TYPE TextoFujao
  'a linha onde esta'
  'sua ultima coluna
  'seu tamanho
  'sua cor
  linha AS INTEGER
  ultcol AS INTEGER
  tam AS INTEGER
  cortxt AS INTEGER
END TYPE

'Define as variaveis globais
COMMON SHARED cima$, baixo$, esquerda$, direita$, home$, end$, pgup$, pgdn$
COMMON SHARED esc$, enter$, backsp$, aspas$, numero$, arqa$
COMMON SHARED fase, abrir, faseexterna, LinhaDeBaixo, numsecp, exitdo, jaabriu
COMMON SHARED pontos, pontosAT, IStotal, IStotalAT, arrastou, arrastouAT
COMMON SHARED personagem, abriusalvo, PosSalvada$, impossv, minjdg
COMMON SHARED jogadas, proteger, protegida, msgarr, seqarq$
COMMON SHARED posAG AS Coord, posAN AS Coord, csAG AS Coord, csAN AS Coord
COMMON SHARED posIN AS Coord, posTL AS Coord, posIS AS Coord
COMMON SHARED posINan AS Coord, posTLan AS Coord, posISan AS Coord

'Declara os procedimentos e funcoes
DECLARE SUB AbrirSalvo ()
DECLARE SUB ApagarLinha (linha)
DECLARE SUB Apresentacao ()
DECLARE SUB CLScima ()
DECLARE SUB DesenharCarinha (imagem)
DECLARE SUB DRAWtempo (d$)
DECLARE SUB EditorDeFase ()
DECLARE SUB EncherTela ()
DECLARE SUB EscolherCarinha ()
DECLARE SUB HistoriaDoCarinha ()
DECLARE SUB ImpJogadas (aumento)
DECLARE SUB ImpPontos (aumento)
DECLARE SUB Jogar (testandofase)
DECLARE SUB LimpaBuffer ()
DECLARE SUB MsgFim (msg$)
DECLARE SUB MsgTempo (linha, msg$)
DECLARE SUB Paredes (tirar, apglinhas)
DECLARE SUB Pausa ()
DECLARE SUB PiscarCarinha (aumentar)
DECLARE SUB PRTcent (linha, texto$)
DECLARE SUB PRTmov (l, c, texto$)
DECLARE SUB Quadrinho (cor, cursor)
DECLARE SUB Sair (clsc, apglinhas)
DECLARE SUB SalvarFase ()
DECLARE SUB SalvarJogo ()
DECLARE SUB Tempo (vt!)
DECLARE SUB ZerarPos ()
DECLARE SUB ZerouJogo (fimdearquivo)
DECLARE FUNCTION IPTfix$ (texto$, lmax, apgtralhas) ', tpsair)
DECLARE FUNCTION IPTfixNum (lmax, apgtralhas) ', tpsair)
DECLARE FUNCTION jaobj (obj)
DECLARE FUNCTION Juncao (posicao)
DECLARE FUNCTION LtSt$ (numero)
DECLARE FUNCTION ObstLat (obj, setaref)
DECLARE FUNCTION ObstLin (obj, setaref)
DECLARE FUNCTION Par (numero)
DECLARE FUNCTION PedacoNumero$ (posicao)
DECLARE FUNCTION PontoErrado (base$)
DECLARE FUNCTION RD (min, max)
DECLARE FUNCTION Recomecar (tirarparedes, apglinhas)
DECLARE FUNCTION SetaIlegal ()
DECLARE FUNCTION TerminouFase (direcao$, testandofase)
DECLARE FUNCTION UltimoPsg ()
DECLARE FUNCTION UmaTecla$ (pergunta$, printi, linha, sesalvo)

'Inicia o gerador de aleatorios
RANDOMIZE TIMER
'Instrui a ir `a linha Erro em caso de erro
ON ERROR GOTO Erro


'============================
'Inicio - Definicao de teclas
'============================
       esc$ = CHR$(27)
     enter$ = CHR$(13)
    backsp$ = CHR$(8)
     aspas$ = CHR$(34)
     
         z$ = CHR$(0)
      cima$ = z$ + "H"
     baixo$ = z$ + "P"
  esquerda$ = z$ + "K"
   direita$ = z$ + "M"
      home$ = z$ + "G"
       end$ = z$ + "O"
      pgup$ = z$ + "I"
      pgdn$ = z$ + "Q"
'============================
'Fim - Definicao de teclas
'============================

'Coloca 1 como o limite inferior padrao na definicao de arranjos
OPTION BASE 1

'Define as matrizes de tela
'   jg: do jogo
'copia: guarda uma copia da tela do jogo para poder reiniciar a fase
'  edt: do editor de fases
'  apr: da de apresentacao
DIM SHARED telajg(18, 40), copiatelajg(2 TO 17, 2 TO 39), telaedt(18, 40), telaapr(18, 40)


'Define os limites das telas como paredes

'linhas
FOR controle = 1 TO 40
  telaapr(1, controle) = 10: telaapr(18, controle) = 10
  telaedt(1, controle) = 10: telaedt(18, controle) = 10
   telajg(1, controle) = 10:  telajg(18, controle) = 10
NEXT
'colunas
FOR controle = 2 TO 17
  telaapr(controle, 1) = 10: telaapr(controle, 40) = 10
  telaedt(controle, 1) = 10: telaedt(controle, 40) = 10
   telajg(controle, 1) = 10:  telajg(controle, 40) = 10
NEXT


'som: cada elemento do arranjo e' o som que toca quando
'     pega o objeto com aquele codigo
'secpegou: se pegou o pers secreto com aquele codigo
'jgdfs: quantas jogadas foram feitas naquela fase. Se o 2ß indice for 1,
'       sao as jogadas feitas; se for 2, e' o minimo possivel
'parcIS, r, prot: usados na criptografia
'svs: mexem com os valores lidos e gravados numa salvada
'     e confere-os, validadando o arquivo
'ordem: ordem usada na criptografia
DIM SHARED secpegou(primeirosec TO numpsgtot), jgdfs(0 TO maxfases, 2), som$(2 TO 4)
DIM SHARED parcIS(4), parcIS$(4), r$(8), prot(6), prot$(6)
DIM SHARED svs1$(tamsalvo / 2), svs2$(tamsalvo / 2, 2), svs3(ujs, 2), ordem(tamsalvo / 2, 2)

'Le os dados em DATA e grava no arranjo ordem
FOR controle = 0 TO tamsalvo - 1
  READ ordem(controle \ 2 + 1, Par(controle) + 2)
NEXT

'Aqui: fazer o algoritmo de ler o arquivo salvo e tal
'para definir os personagens secretos habilitados
secpegou(Melo) = V
'secpegou(I.S.) = V
'secpegou(Homero) = V
'secpegou(Nada) = V
'secpegou(Andre) = V

'Define as constantes usadas em DRAWtempo para escrever o logotipo FUGA
'preench: usado quando se quer preencher aquela area com a corpadrao
preench$ = "BF1 P" + STR$(corpadrao) + "," + STR$(corcursor) + "BH1 C" + STR$(corcursor)
DIM SHARED logotipo$(4)
logotipo$(1) = "R30F5G5L20D20R20F5G5L20D30L10U70" + preench$ + "BR35 BR15"
logotipo$(2) = "D66F4R36E4U66L10D57G4L16H4U57L10" + preench$ + "BR44 BR15"
logotipo$(3) = "BR10R25F10D6G4L6H4U3H2L12G5D40F5R13E5U10L5H3U5E3R12F3D22G10L25H10U50E10" + preench$ + "BR35 BR15"
logotipo$(4) = "BD10E10R16F10D60L10U30L16D30L10U60BR10BD5D15R16U15H6L4G6 BL2" + preench$ + "BR2 BR15"

'Nomes dos pers
DIM SHARED nomepsg$(numpsgtot)
 nomepsg$(Black) = "Black Happy Man"
 nomepsg$(Brown) = "Brown Happy Man"
   nomepsg$(Sir) = "Sir Spahda"
 nomepsg$(Nois2) = "N¢is2"
    nomepsg$(Mr) = "Mr. Mystery"
    nomepsg$(Rm) = "Yretsym Rm"
nomepsg$(Decepa) = "Decepador"
    nomepsg$(ET) = "E.T."
  nomepsg$(Beto) = "Beto"

'secretos
  nomepsg$(Melo) = "Melo Dias"
  nomepsg$(I.S.) = "I.S."
nomepsg$(Homero) = "N. Homero"
  nomepsg$(nada) = "Super Nada"
 nomepsg$(Andre) = "AndrÇ"

'Historias
DIM SHARED hist$(numpsgtot), truncado$(14)
 hist$(Black) = "era feliz demais"
 hist$(Brown) = "era alegre demais"
   hist$(Sir) = "vivia enfrentando o grande Cetis di Ourus, mas um dia foi derrotado por Zap, O Maior"
 hist$(Nois2) = "ficava falando " + aspas$ + "sozinho" + aspas$ + ", ai' acharam que ele era louco"
    hist$(Mr) = "era cheio dos enigmas, e por isso ninguem o entendia"
    hist$(Rm) = "deixava todos confusos so' com seu olhar"
hist$(Decepa) = "decepava muita gente. Ate' ai' tudo bem, mas um dia decepou um politico importante"
    hist$(ET) = "estava com o visto vencido quando chegou a Terra"
  hist$(Beto) = "nao deu motivos pra ser preso"

  hist$(nada) = "nao era nada"

'ASCIIs dos personagens
DIM SHARED ascii(numpsgtot)
ascii(Black) = 1
ascii(Brown) = 2
ascii(Sir) = 6
ascii(Nois2) = 19
ascii(Mr) = 63
ascii(Rm) = 168
ascii(Decepa) = 155
ascii(ET) = 207
ascii(Beto) = 225

'secretos
ascii(I.S.) = 42
ascii(Melo) = 14
ascii(Homero) = 49
ascii(nada) = 32
ascii(Andre) = 65

'Cores dos objetos
DIM SHARED cor(0 TO 10)
cor(0) = Preta
cor(1) = Marrom
cor(2) = Amarela
cor(3) = Verde
cor(4) = Roxo
cor(5) = Ciano + Clara
cor(6) = Ciano + Clara
cor(7) = Ciano + Clara
cor(8) = Ciano + Clara
cor(9) = Ciano + Clara
cor(10) = Preta + Clara

'Cores usadas para piscar os pers na hora do teletransporte
DIM SHARED corpsc(6)
corpsc(1) = cor(2)
corpsc(2) = cor(3)
corpsc(3) = cor(4)
corpsc(4) = cor(5)
corpsc(5) = cor(10)
corpsc(6) = cor(1)

'Define o arranjo desenho, os caracteres ASCIIs dos objetos
DIM SHARED desenho(0 TO 10) AS STRING * 1
'Vai definir os desenhos
GOSUB Desenhos

'Arranjo do texto de opcoes
DIM SHARED opc$(3)
opc$(1) = " 1) Novo jogo      4) Editor de fases "
opc$(2) = " 2) Abrir salvada  5) Instruá‰es      "
opc$(3) = " 3) Abrir fase(s)  6) Creditos        "

'inicia o modo de tela 7 - 320x200, caracteres 8x8
SCREEN 7

'Define o arranjo fujao
DIM textohist(3) AS TextoFujao, txtmesmo$(3)

'Comeco do graaaaande bloco DO que repete "tudo"
DO
  'Nota: essa parte antes do outro DO e' executada a cada "reinicio" do jogo,
  '      por exemplo, apertando Backspace

  'ver se coloca pra poder ser um secreto se ja tiver sido pego
  'Define o desenho(1) pra ser usado no texto rolante e na Apresentacao
  desenho(1) = CHR$(ascii(RD(1, numpsgin)))
 
  'define o texto rolante a cada vez que ele e' escrito por completo
  TextoRolante$ = desenho(1) + Escorregadia$

  IF pratico OR meiopratico THEN
    ZerarPos
    FOR controle = 1 TO 3
      IF controle > 1 THEN LOCATE , 2: PRINT SPACE$(38)
      PRTcent CSRLIN, opc$(controle): PRINT
    NEXT
   
    ELSE 'Nesse caso nao precisa zerar porque isso ja' e' feito na Apr
      Apresentacao
  END IF
  LimpaBuffer

  DO
    'jatexto: serve pra fazer o texto rolante aparecer na coluna certa:
    '         se ja comecou a rolar, e o jogador foi prum menu e cancelou,
    '         ele continua rolando de onde estava
    IF NOT jatexto THEN c = 39
    FOR controle = 1 TO 17 '17 e' o LEN(TextoRolante$)
      IF c > ColOndePara THEN c = c - 1
      IF jatexto THEN
        p$ = MID$(TextoRolante$, controle, 1)
        e$ = e$ + p$
        ELSE e$ = LEFT$(TextoRolante$, controle)
      END IF
      IF LEN(e$) > 39 - ColOndePara THEN e$ = RIGHT$(e$, 39 - ColOndePara)
      'Cada linha, de 2 em 2
      FOR controle2 = 4 TO 10 STEP 2
        'mudacor faz trocar de cor
        IF mudacor THEN cor = corcursor ELSE cor = corpadrao
        COLOR cor
        LOCATE controle2, c: PRINT e$;
        mudacor = NOT mudacor
      NEXT
Tecla: I$ = INKEY$
      opc = VAL(I$)
      IF opc >= 1 AND opc <= 6 OR I$ = esc$ THEN EXIT DO
      Tempo .2
    NEXT
    'jatexto: se ja comecou a escrever o texto rolante
    IF NOT jatexto THEN jatexto = V
  LOOP
  COLOR corpadrao
  jatexto = F

  IF opc = 2 THEN
    'PosSalvada$: qual posicao de salvada sera' aberta
    PosSalvada$ = UmaTecla("Abrir salvada", F, 20, V)
    ApagarLinha 20
    IF PosSalvada$ = esc$ THEN 'O cara cancelou
      PosSalvada$ = "": jatexto = V
      GOTO Tecla 'Volta pra parte que le a tecla
      ELSE 'Escolheu uma posicao (de 1 a 5)
22      OPEN sv$ + PosSalvada$ FOR INPUT AS #4
        'Checa se o arquivo tem o tamanho certo
        IF LOF(4) <> tamsalvo THEN er108 = V
        CLOSE #4
        IF er108 THEN er108 = F: ERROR 108
        'Abre pra ler
        OPEN sv$ + PosSalvada$ FOR BINARY ACCESS READ AS #4
23      AbrirSalvo
        abriusalvo = V 'Indica que foi aberto um jogo
    END IF
  END IF

  IF opc = 3 THEN 'OR opc = 2 THEN - deve estar errado
FaseExt:
   'DO
    'Le o nome do arquivo
    LOCATE 20, 1: baseab$ = IPTfix("Abrir", 31, V)', F)
    IF baseab$ = esc$ THEN    'Cancelou
      'volta o valor de jatexto, pra continuar rolando-o
      jatexto = V
      'volta a esperar apertar uma tecla
      GOTO Tecla
    END IF
   'LOOP WHILE PontoErrado(baseab$) - estranho!
3   OPEN baseab$ + extfase$ FOR INPUT AS #1: CLOSE #1
4   arqa$ = baseab$ + extfase$
    faseexterna = V: abrir = V
  END IF

  'mudado
  IF pratico OR meiopratico THEN CLS  ELSE Paredes V, 2

  IF opc >= 1 AND opc <= 4 THEN 'Comeco do "jogo"
 
    PLAY "O2"
   
    'Escolhe o carinha se nao abriu jogo
    IF opc <> 2 THEN EscolherCarinha
    'Atribui o caractere ao desenho(1)
    desenho(1) = CHR$(ascii(personagem))
    Paredes F, 0
    'Mostra a historia se for jogo novo
    IF NOT (pratico OR meiopratico) AND opc = 1 THEN HistoriaDoCarinha

    'Se for o Melo, os sons ficam diferentes
    IF personagem = Melo THEN
      ELSE
        som$(2) = "L19GGG>L16C<"
        som$(3) = "L25FA+"
        som$(4) = "<L25FA+>"
    END IF

    'Se for o N. Homero, troca os desenhos por numeros
    IF personagem = Homero THEN
      FOR controle = 2 TO 9
        desenho(controle) = LtSt$(controle)
      NEXT
    END IF

  END IF

  SELECT CASE opc
    CASE 1, 2, 3
LinhaJg: Jogar F
     
      'Se chegou aki, e' porque saiu ou vai salvar
      IF PosSalvada$ <> "" THEN
        SalvarJogo
        IF impossv THEN impossv = F 'colocar algo pra ele voltar pro menu
        ApagarLinha 23
        GOTO LinhaJg
      END IF

    CASE 4

      arqa$ = "Modelo.de.fase.vazia"
      DO
EntrEdt: EditorDeFase
        IF exitdo THEN exitdo = F: EXIT DO
        IF abrarq THEN GOSUB ArqEdt: GOTO EntrEdt
 
        IF NOT quasesalvou THEN quasesalvou = V
        IF basesv$ <> esc$ THEN basesva$ = basesv$

        COLOR corpadrao
        IF proteger THEN
          'extensao do arquivo
          ext$ = extprot$
          IF NOT jasalvou THEN basesv$ = baseat$
          'Estranho! Se ainda nao salvou, nao devia dar pra proteger...
          IF basesv$ = "" THEN GOTO EntrEdt
          IF basesv$ = esc$ THEN basesv$ = basesva$
          LOCATE 23, 1
          GOTO 5 'Pula pedido de nome pro arquivo e verificacoes
          ELSE ext$ = extfase$
        END IF
ArqSv:
        LOCATE 23, 1: basesv$ = UCASE$(IPTfix("Salvar em", 15, V))', V))
        IF basesv$ = esc$ THEN GOTO EntrEdt
        IF basesv$ = "" AND (jasalvou OR abrir) THEN
          PRINT
Subst:    IF proteger THEN
            'se for proteger, a base a salvar e' a usada antes
            baseasv$ = basesv$
           
            'Se ja' salvou, mesma coisa
            ELSEIF jasalvou THEN baseasv$ = basesva$
           
            'Se abriu e ainda nao salvou, e' o mesmo nome do arquivo aberto
            ELSE baseasv$ = baseat$
          END IF
          'Pede confirmacao para substituir o arquivo
          opc$ = UmaTecla("Substituir " + aspas$ + baseasv$ + ext$ + aspas$, F, 0, F)
          IF opc$ = "S" THEN
            basesv$ = baseasv$
            IF proteger THEN GOTO 6
            ELSEIF proteger THEN ApagarLinha 23: GOTO EntrEdt
           
            'se for nao, ele volta, pedindo outro nome de arquivo
            ELSE ApagarLinha 24: GOTO ArqSv
          END IF
        END IF
        'CASE ELSE: IF PontoErrado(basesv$) THEN GOTO ArqSv

5       OPEN basesv$ + ext$ FOR INPUT AS #2: CLOSE #2
        'Se chegou aki, e' porque ja' existe arquivo
        IF proteger THEN
          'Se for proteger, ele pede confirmacao
          GOTO Subst
         
          'Se for so' salvar, ele grava uma copia <base>.bak
          ELSE SHELL "MOVE " + basesv$ + ext$ + " " + basesv$ + ".BAK /Y >NUL"
        END IF
6       arqs$ = basesv$ + ext$
 
        'Salva realmente
        SalvarFase
        'Se deu certo, ele continua, senao ele pula
        IF NOT impossv THEN
          ApagarLinha 23: ApagarLinha 24
          IF proteger THEN resultado$ = "protegida" ELSE resultado$ = "salva"
          'Mostra a mensagem
          PRTcent 23, "Fase " + resultado$ + "!"
          PRTcent 24, "Pressione qualquer tecla..."
          LimpaBuffer
          Pausa
          ApagarLinha 23: ApagarLinha 24
          jasalvou = V
         
          ELSE impossv = F
        END IF
        'Nesse loop, ele volta pro editor
 
      LOOP
 
    CASE 0 'O cara deu ESC
      COLOR corpadrao
      IF NOT pratico THEN CLS
      END
  END SELECT 'Ces't fini!

LOOP

Desenhos:
  'Define os desenhos
  desenho(0) = "€"
  'o 1 e' "dinamico"
  desenho(2) = ""
  desenho(3) = ""
  desenho(4) = "*"
  desenho(5) = CHR$(24) '
  desenho(6) = CHR$(25) '
  desenho(7) = CHR$(27) '
  desenho(8) = CHR$(26) 'seta pra direita...
  desenho(9) = ""
  desenho(10) = "±"
RETURN

'Abre um arquivo para edicao
ArqEdt:
  DO
    LOCATE , 1: baseab$ = UCASE$(IPTfix("Abrir", 15, V))', V))
  LOOP WHILE PontoErrado(baseab$)
  'O cara deu ESC
  IF baseab$ = esc$ THEN RETURN
1 OPEN baseab$ + extfase$ FOR INPUT AS #1: CLOSE #1
2 baseat$ = baseab$: arqa$ = baseab$ + extfase$
  abrir = V
  ApagarLinha CSRLIN
  jaeditou = F: jasalvou = F: quasesalvou = F: abrarq = F: ZerarPos
RETURN

Erro:
  e = ERR
  SELECT CASE ERL
    CASE 1: IF e = 52 OR e = 53 OR e = 64 OR e = 75 OR e = 76 THEN RESUME ArqEdt
    CASE 3: IF e = 52 OR e = 53 OR e = 64 OR e = 75 OR e = 76 THEN RESUME FaseExt
    CASE 5: IF e = 53 THEN RESUME 6 ELSE ApagarLinha 24: RESUME ArqSv
    CASE 7, 19
      'Deu pau pra salvar (ex: disco protegido)
      IF ERL = 7 THEN ApagarLinha 24
      MsgTempo 23, "N∆o foi poss°vel salvar o arquivo!"
      impossv = V
      RESUME NEXT
    CASE 9: IF e = 62 THEN MsgFim "TÇrmino precoce dos dados no arquivo!"
    CASE 10: IF e = 4 THEN MsgFim "TÇrmino precoce dos dados do jogo!"
    CASE 12: IF e = 9 OR e = 62 THEN MsgFim "Faltou o n£mero ou separador no arquivo"
    CASE 13: IF e = 5 OR e = 9 THEN MsgFim "N£mero inv†lido no arquivo"
    CASE 15, 17: IF e = 6 THEN MsgFim "Vocà n∆o acha que exagerou, n∆o?"
   
    'Nota: esse erro nao deve dar nunca!
    CASE 20: MsgFim "Erro durante gravacao do arquivo"
    CASE 22
      SELECT CASE e
        '53: nao encontrado
        CASE 53: msg$ = "A posicao " + PosSalvada$ + " esta vazia!"
        '108: tem tamanho errado (nota: isso acontece se mudar o valor de qtfases)
        CASE 108: msg$ = "Arquivo " + sv$ + PosSalvada$ + " invalido!"
        CASE ELSE: msg$ = ""
      END SELECT
      IF msg$ <> "" THEN MsgTempo 20, msg$: jatexto = V: RESUME Tecla
    CASE 24: MsgFim "Erro ao ler arquivo"
    CASE 25: IF e = 109 OR e = 6 THEN MsgFim "Conteudo do arquivo invalido" ELSE MsgFim "Erro ao abrir salvada"
  END SELECT

  SELECT CASE e
    CASE 101: MsgFim "H† uma seta em uma posiá∆o ilegal"
    CASE 102: MsgFim "H† dois pontos de partida na mesma fase"
    CASE 103: MsgFim "H† dois teletransportes na mesma fase"
    CASE 104: MsgFim "C¢digo de objeto incorreto"
    CASE 105: MsgFim "Faltou o ponto de partida na fase"
    CASE 106: MsgFim "Faltou o teletransporte na fase"
    CASE 107: MsgFim "O n£mero no arquivo foi alterado"
  END SELECT

  COLOR corpadrao: PRINT "Erro"; e; "na linha"; ERL
  STOP: RESUME

END

'Dados para a ordem no arquivo (criptografia)
DATA 68,303,218,278,296,57,85,212,225,127,48,238,137,152,72,309,288,93,206,118,26,159,44,221,258,345,126,232,284,43,41,274,180,115,74,111,235,271,141,142,231,101,171,203,248,285,336,109,116,255,38,151,182,273,259,314,257
DATA 40,342,113,236,58,190,321,251,79,170,123,188,198,320,3,346,70,108,62,286,240,301,327,191,230,63,340,246,226,30,307,276,195,11,157,16,134,65,242,292,325,185,267,310,78,184,128,187,55,114,139,140,326,53,261,143,263,5
DATA 161,323,9,166,95,25,96,103,104,73,318,176,102,13,18,155,50,153,308,7,130,208,349,106,110,252,239,23,214,260,148,298,45,133,228,158,24,277,282,92,265,131,61,82,19,329,200,52,287,117,207,209,266,8,312,199,154,119,275
DATA 333,46,350,313,67,49,264,213,138,60,160,220,136,1,245,120,262,69,295,31,305,223,290,222,224,163,194,254,99,237,347,324,279,289,105,181,124,64,97,156,234,291,56,219,173,233,337,71,268,12,20,129,348,217,205,179,149,175
DATA 89,229,17,281,330,196,341,132,306,243,121,165,32,66,186,270,304,344,244,21,27,338,10,162,317,86,328,216,150,144,210,146,177,14,76,334,293,59,183,135,280,47,35,28,227,80,335,256,164,204,331,300,91,241,215,172,272,81
DATA 147,33,250,316,302,169,297,42,29,315,87,319,201,122,54,269,112,322,34,2,84,6,75,193,90,247,100,253,77,83,88,15,168,211,311,51,299,178,36,332,174,4,192,22,343,107,39,98,94,125,283,249,37,294,197,202,145,339,167,189

fases:
DATA ,7,,,7,,,,,9,,,,9,,,,9,9,,,,,,,,,,9,,9,9,,9,,,,
DATA ,9,,9,9,9,,,,,,,,9,,8,,,9,,,,3,9,,,,,,,,9,,9,9,9,9,
DATA ,8,,,8,,7,,,9,,,9,,,7,7,,9,,8,,,9,,9,,9,9,9,,9,,9,,,,
DATA 9,9,9,9,9,,9,9,,,,,,,,8,8,,,7,,,,,,,,,,9,,9,,,,9,9,
DATA ,,,,9,6,9,,,9,,,,,,7,,,,,,,,,,,,,,,,,,,,,9,
DATA ,9,9,,7,,9,9,,9,,,9,,,,9,,,,,9,9,9,,9,9,,,9,,,9,,,9,9,
DATA ,,,,9,5,9,,,,,,9,9,9,,,6,9,,,9,,,,,,,9,9,,9,9,,,,,
DATA ,9,9,9,,,,,,8,,,2,,,,9,,,,,9,,,,,9,9,9,,,,9,,,9,9,9
DATA 6,,,,,,,,,9,,,,9,9,,9,9,6,9,9,9,9,,,,,9,,,,,,,,9,9,9
DATA 6,,,9,,9,9,,9,9,9,,,9,,,7,,,,,9,,,5,9,,9,9,9,9,9,9,,,,,
DATA 6,,,,,,,,,9,,,,,,9,,9,,9,9,9,,9,,,,8,,,,,9,,,,,
DATA ,9,,,9,,9,,,9,,7,,,9,,,,,,8,8,,9,5,9,,,,8,,,9,,9,,,
DATA ,,9,9,9,9,9,9,,,,7,,9,,,9,9,,9,9,,9,9,,9,,7,7,,,,3,,,,,5
DATA ,9,,,9,9,9,,9,9,9,,,9,,9,,,,,,9,,,,9,1,,,,,,9,6,9,9,,5
DATA ,,,,9,9,,,,,,9,5,,,9,,9,,9,,,,9,,9,5,5,9,,,9,9,,,,9,5
DATA 9,,,8,,,,9,,9,,,,8,,9,,,,,7,,,,,,,,,,,,9,,9,,,
DATA 0085264936143540545760319605395193

DATA 9,9,,,,,,9,9,,,,,,,,,,,,,,,9,,,,,,,,,,,9,3,,9
DATA 9,,,,9,9,,,9,,,,,,,,,,,,,9,,,,,,,,,,,,,,,,
DATA ,,,2,,,,,,,,,,,,,9,,,,,,,9,9,,,9,9,9,,,9,,,,,9
DATA ,,,,9,9,,,,,,,9,9,,,9,,,,,9,9,9,,,,,,,,,,,9,,9,9
DATA ,,,,,,9,,,,,,,,9,,,,,,,9,,,9,,,,,,,,,,9,,,9
DATA 9,9,,,9,,,,,,,,9,,9,,,,,,9,,,,,,,9,9,9,9,9,9,9,,,,
DATA ,,,9,,,,9,,,,,,,9,,,,9,,9,,9,,9,,9,,,,9,,,,9,,,
DATA ,,,,9,,,,9,,,,,,,,,,,,8,,9,,,,,,,,,,,,,,9,9
DATA ,,9,,,,,,,9,,,,,9,,,,,,9,,9,,9,9,,,,,9,,,,,,,9
DATA ,,,9,,,,,,,,,,,,,,,,,9,,,9,,,,,,,,,,,9,9,,9
DATA ,,,,9,,,,,,,9,,,,,,,,,9,9,,,,9,9,,,,,9,,,9,,,9
DATA ,,,9,,,,,,,,,,,,,,,,9,9,,,,9,,,,,,9,,,,8,,,9
DATA 9,,,9,,,,,,,,,,9,,,,,9,9,9,,,,,,,,,,,9,,9,9,,,
DATA 9,,,,,,,9,,,,,,,,,,,9,9,9,,,,,,,,,,,,,9,9,,,
DATA 9,,,,,,,,9,,9,,,9,,3,,9,9,,,,,,,9,9,,,,9,,6,,,,,
DATA 9,,,9,,,,,,9,,,,,,,,,,,9,,9,,,,,,,,,,,,9,,,1
DATA 5842163615547642946971530728354283

DATA ,7,,9,9,,,,,,,,,1,7,3,,,,8,,,,,,,,,,,,,,9,,,9,
DATA ,9,5,,,,,,,,,,,9,9,9,9,,,8,,,,,,,9,,,,,,,,9,,,
DATA 6,,,,,,7,,,,,,,,,,9,9,,7,,,,,,,,9,9,9,9,,,,9,,,
DATA ,,,9,9,6,,,,6,,,,9,,,,,9,,9,,,,,,8,,,,9,,9,,,,,
DATA ,9,,9,9,,,,,,,,,3,7,,,,,9,,,,,,,,9,3,,,,9,,,9,,
DATA 6,,,9,9,,,,,,,,9,5,,,,,,,5,,,,,9,,,9,,,8,8,8,,9,9,5
DATA 6,,5,,,9,,,,,,,9,,,,,,,,,,,,5,,9,,9,,,,,,,,,
DATA ,,,,,,,,,,,,8,,8,,9,,,,5,6,,,,,9,,,9,9,9,,9,5,,9,
DATA 9,6,,,,,,,,,,,,,,9,,9,,9,,,,,,,,9,,,,,,,,,,
DATA ,,9,6,,,,9,,,,9,,,,7,,7,,,,,,,9,,,,9,,,,,9,,9,,9
DATA ,,,,,,,,,7,7,,,,7,,,,,,,,,,,9,9,,,,,,,9,,,,9
DATA ,,9,9,,,5,,,,,9,,,9,9,5,9,,,,,,,7,7,,,9,,5,9,,,,9,,
DATA ,9,,,,9,,,,,,,,7,,,,,,,,,,8,,,7,,,9,,,9,,,9,,9
DATA ,,,,6,,9,,,,,9,6,9,,,,9,9,9,,,,,,9,9,9,,,9,,,9,5,9,9,
DATA ,,,,,,2,9,,,,9,,,,,,,,,,,,,,,,,,,,,,,,,,
DATA ,,8,,,,,,,8,,9,,9,,,,,,,9,,,,,,,9,,,,,,,,,,
DATA 7650465085563544965452360982157236

SUB AbrirSalvo
'Abre um jogo salvo

'seqarq: sera' preenchido com o arquivo
seqarq$ = SPACE$(tamsalvo)
24 GET #4, 1, seqarq$
25

FOR controle = 1 TO 7
  'Se um for EQV do outro (ambos F ou V), tem erro
  IF Par(Juncao(controle)) EQV Par(Juncao(controle + 1)) THEN ERROR 109
  IF NOT javiu THEN
    javiu = V
    'Se Par(um) EQV Par(outro), significa que arrastou = V
    IF Par(controle) EQV Par(Juncao(controle)) THEN arrastou = V
  END IF
NEXT

'???
FOR controle = 9 TO ujs STEP 4
  svs3(controle \ 4 - 1, 1) = Juncao(controle) - Juncao(controle + 2) - 34
  svs3(controle \ 4 - 1, 2) = Juncao(controle + 1) - Juncao(controle + 3) - 85
  IF svs3(controle \ 4 - 1, 1) <> svs3(controle \ 4 - 1, 2) THEN ERROR 109
NEXT

'faz as atribuicoes
pontos = svs3(1, 2)
fase = svs3(2, 2)
IStotal = svs3(3, 2)
personagem = svs3(4, 2)
IF fase < 2 OR fase > qtfases OR IStotal >= fase OR personagem < 1 OR personagem > numpsgtot THEN ERROR 109

'atribui as jogadas de cada fase
FOR controle = 1 TO qtfases
  j = svs3(controle + 4, 2)
  IF j < 0 OR j > 999 OR (fase > controle AND j = 0) OR (fase <= controle AND j <> 0) THEN ERROR 109
  jgdfs(controle, 1) = j
NEXT

CLOSE #4
26

END SUB

SUB ApagarLinha (linha)
'Apaga a linha escolhida

LOCATE linha, 1: PRINT SPACE$(40);

END SUB

SUB Apresentacao
'Mostra a apresentacao

'jaapr: fica V quando a apresentacao ja' tiver sido exibida
STATIC jaapr

'Calcula a posicao do inicio
posIN.l = RD(2, 17): posIN.c = RD(2, 39)
DO
  'calcula a do teletransporte, e recalcula se cair a mesma que a do inicio
  posTL.l = RD(2, 17): posTL.c = RD(2, 39)
LOOP WHILE posTL.l = posIN.l AND posTL.c = posIN.c

Tempo 1
Paredes F, 0
'ds: duracao do som
't: o tempo a esperar
'Se ja mostrou a apresentacao, vai rapido agora
IF jaapr THEN ds! = .5: t! = .001 ELSE ds! = 2: t! = .15
som = 600
Tempo .3

'Desenha as linhas subindo
FOR l = 17 TO 2 STEP -1
  FOR c = 20 TO 39
    GOSUB ComumApr
  NEXT
  som = som + 100
  SOUND som, ds!
  Tempo t!
NEXT

'Desenha as linhas descendo
FOR l = 2 TO 17
  FOR c = 19 TO 2 STEP -1
    GOSUB ComumApr
  NEXT
  som = som - 100
  SOUND som, ds!
  Tempo t!
NEXT

IF jaapr THEN t! = .5 ELSE t! = 1.6
Tempo t!

'Desenha o logotipo
PSET (xm - 140, ym - 130), corcursor
FOR controle = 1 TO 4
  IF jaapr THEN DRAW logotipo$(controle): Tempo .001 ELSE DRAWtempo logotipo$(controle)
NEXT

'Toca a musiquinha
'Ver se muda essa musica com o Melo Dias
PLAY "O3 L15dcd L8f"

ZerarPos
jaapr = V

COLOR corpadrao
'Controla se o texto aparece junto ou separado por "enters"
separado = V 'td
IF separado THEN LOCATE 12 ELSE LOCATE 14
FOR controle = 1 TO 3
  IF separado AND controle > 1 THEN LOCATE , 2: PRINT SPACE$(38)
  Tempo .1
  PRTcent CSRLIN, opc$(controle): PRINT
  Tempo .1
NEXT

EXIT SUB

ComumApr:
  'Faz o servico comum nos dois pedacos (subida e descida)
  IF posIN.l = l AND posIN.c = c THEN
    obj = 1
    ELSEIF posTL.l = l AND posTL.c = c THEN obj = 2
    ELSE
      'Pega uma porcentagem pra escolher um objeto
      SELECT CASE RD(1, 100)
        CASE IS <= 70: obj = 0 '70%
        CASE 71: obj = 3       ' 1%
        CASE IS <= 97          '26%
          obst9l = (telaapr(l + 1, c) = 5 OR telaapr(l + 1, c) = 6 OR telaapr(l - 1, c) = 5 OR telaapr(l - 1, c) = 6)
          obst9c = (telaapr(l, c + 1) = 7 OR telaapr(l, c + 1) = 8 OR telaapr(l, c - 1) = 7 OR telaapr(l, c - 1) = 8)
          IF obst9l OR obst9c THEN GOTO ComumApr
          obj = 9
        CASE IS <= 100         ' 3%
          'escolhe uma seta aleatoriamente
          obj = RD(5, 8)
          'faz a checagem
          pcsl = F: pcsc = F
          SELECT CASE obj
            CASE 5, 6: pcsl = V
            CASE 7, 8: pcsc = V
          END SELECT
          linear = (ObstLin(telaapr(l + pcsl, c + pcsc), obj) OR ObstLin(telaapr(l - pcsl, c - pcsc), obj))
          lateral = (ObstLat(telaapr(l + NOT pcsl, c + NOT pcsc), obj) OR ObstLat(telaapr(l - NOT pcsl, c - NOT pcsc), obj))
          'Se deu SetaIlegal, sorteia objeto de novo
          IF linear OR lateral THEN GOTO ComumApr
      END SELECT
  END IF

  'Atribui `a tela e desenha
  telaapr(l, c) = obj
  COLOR cor(obj)
  LOCATE l, c: PRINT desenho(obj);

RETURN

END SUB

SUB CLScima
'Apaga a tela mandando o que tiver nela pra cima

FOR controle = 1 TO 24
  LOCATE 24: PRINT
  Tempo .01
NEXT
CLS

END SUB

SUB DesenharCarinha (imagem)
'Desenha o carinha relativo ao codigo especificado

'Desenha um quadrado solido sem cor, pra apagar o anterior
LINE (xe, yc)-(xd, yb), 0, BF
'Desenha um ponto sem cor na "origem"
PSET (xm, ym), 0
'Seleciona a cor(1)
COLOR cor(1): DRAW "C" + STR$(cor(1))

SELECT CASE imagem
  CASE Black
    CIRCLE STEP(0, 0), 30
    CIRCLE STEP(-10, -10), 2
    PAINT STEP(0, 0)
    CIRCLE STEP(20, 0), 2
    PAINT STEP(0, 0)
    CIRCLE STEP(-10, 17), 15, , pi, 0, .5
    LINE STEP(-16, 0)-STEP(32, 0)
    PAINT STEP(-17, 3)
  CASE Brown
    CIRCLE STEP(0, 0), 30
    PAINT STEP(0, 0)
    CIRCLE STEP(-10, -10), 2, 0
    PAINT STEP(0, 0), 0
    CIRCLE STEP(20, 0), 2, 0
    PAINT STEP(0, 0), 0
    CIRCLE STEP(-10, 17), 15, 0, pi, 0, .5
    LINE STEP(-16, 0)-STEP(32, 0), 0
    PAINT STEP(-17, 3), 0
  CASE Sir
    DRAW "BD8 BL6 BD3 F4 D5"
    CIRCLE STEP(4, 1), 4, , pi, , 1
    DRAW "BR4 BU1 U5 E4"
    CIRCLE STEP(-8, -3), 12, , 2.1, 1, .4
    DRAW "BR5 U25 M-5,-8 M-5,7 D26"
    PAINT (xm, ym + 15)
  CASE Nois2
    DRAW "BU25 BL5 L15 M+5,+42 R5 NM+5,-42"
    PAINT STEP(-1, -1)
    LINE STEP(1, 4)-STEP(-5, 5), , BF
    COLOR 0
    PSET STEP(0, 0)
    PSET STEP(0, -5)
    PSET STEP(5, 0)
    PSET STEP(0, 5)
    PSET (xm + 5, yc)
    COLOR cor(1)
    DRAW "C" + STR$(cor(1)) + "R15 M-5,+42 L5 NM-5,-42"
    PAINT STEP(1, -1)
    LINE STEP(-1, 4)-STEP(5, 5), , BF
    COLOR 0
    PSET STEP(0, 0)
    PSET STEP(0, -5)
    PSET STEP(-5, 0)
    PSET STEP(0, 5)
    CIRCLE (xm - 15, yc + 7), 1
    CIRCLE (xm - 9, yc + 5), 1
    CIRCLE (xm - 12, yc + 12), 4, , pi - .1, 2 * pi - 1.4, .4
    CIRCLE (xm + 15, yc + 7), 1
    CIRCLE (xm + 9, yc + 5), 1
    CIRCLE (xm + 12, yc + 12), 4, , 1.4 * pi, .1, .4
  CASE Mr
    CIRCLE (xm + 9, ym - 10), 15, , 3 * pi / 2 + .4, , 1.2
    CIRCLE (xm, ym - 10), 20, , , pi - .4, .7
    CIRCLE STEP(0, 0), 10, , , pi - .7, .7
    CIRCLE STEP(-13, -4), 5, , pi - .5, , .5
    CIRCLE (xm - 1, ym - 10), 15, , 3 * pi / 2 + .4, , 1.2
    CIRCLE (xm + 12, ym + 15), 14, , pi / 2 + .7, 5 * pi / 4 - 1.1, 1
    CIRCLE (xm + 22, ym + 15), 14, , pi / 2 + .7, 5 * pi / 4 - 1.1, 1
    CIRCLE (xm + 4, ym + 12), 5, , pi, , .6
    PAINT STEP(-1, -1)
    CIRCLE (xm + 4, yb - 4), 4
    PAINT STEP(0, 0)
    CIRCLE (xm - 5, ym - 10), 2
    PAINT STEP(0, 0)
    CIRCLE (xm + 5, ym - 7), 3
    PAINT STEP(0, 0)
    LINE STEP(-4, -1)-STEP(-3, -1)
    CIRCLE (xm - 8, ym - 2), 3, , pi / 2 + .8, 3 * pi / 2 - .8, 1.5
    CIRCLE STEP(2, 11), 7, , pi / 4, pi / 2, .8
  CASE Rm
    CIRCLE (xm - 9, ym + 10), 15, , pi / 2 + .4, pi, 1.2
    CIRCLE (xm, ym + 10), 20, , pi, 2 * pi - .4, .7
    CIRCLE STEP(0, 0), 10, , pi, 2 * pi - .7, .7
    CIRCLE STEP(13, 4), 5, , 2 * pi - .5, pi, .5
    CIRCLE (xm + 1, ym + 10), 15, , pi / 2 + .4, pi, 1.2
    CIRCLE (xm - 12, ym - 15), 14, , 3 * pi / 2 + .7, 9 * pi / 4 - 1.1, 1
    CIRCLE (xm - 22, ym - 15), 14, , 3 * pi / 2 + .7, 9 * pi / 4 - 1.1, 1
    CIRCLE (xm - 4, ym - 12), 5, , , pi, .6
    PAINT STEP(1, 1)
    CIRCLE (xm - 4, yc + 4), 4
    PAINT STEP(0, 0)
    CIRCLE (xm + 5, ym + 10), 2
    PAINT STEP(0, 0)
    CIRCLE (xm - 5, ym + 7), 3
    PAINT STEP(0, 0)
    LINE STEP(4, 1)-STEP(3, 1)
    CIRCLE (xm + 8, ym + 2), 3, , 3 * pi / 2 + .8, pi / 2 - .8, 1.5
    CIRCLE STEP(-2, -11), 7, , 5 * pi / 4, 3 * pi / 2, .8
  CASE Decepa
    CIRCLE STEP(0, 0), 25, , , , 1
    FOR controle = 1 TO 20
      PSET (RD(xe + 20, xd - 20), RD(yc + 3, yc + 6))
      PSET (RD(xe + 15, xd - 20), RD(yc + 7, yc + 10))
    NEXT
    CIRCLE (xm - 10, yc - 6), 30, , 5 * pi / 4 + .23, 7 * pi / 4 + .23, .65
    CIRCLE (xm - 10, yc - 3), 30, , 5 * pi / 4 + .23, 7 * pi / 4 + .3, .62
    CIRCLE (xm - 9, ym - 7), 2
    PSET STEP(1, 0)
    LINE STEP(-2, -5)-STEP(6, 6)
    LINE STEP(-1, 0)-STEP(-6, -6)
    CIRCLE (xm + 6, ym - 10), 2
    PSET STEP(1, 0)
    LINE STEP(0, -5)-STEP(-6, 6)
    LINE STEP(1, 0)-STEP(6, -6)
    CIRCLE (xm + 3, ym - 3), 4, , 3 * pi / 2 - .8, 2 * pi - .2, 1.5
    CIRCLE (xm + 13, ym + 20), 15, , pi / 2, pi - .4, .8
    LINE (xm - 9, ym + 3)-(xm - 1, ym + 13)
    LINE STEP(3, -1)-(xm - 5, ym - 1)
    LINE STEP(0, 0)-(xm - 9, ym + 3)
    LINE STEP(3, 2)-(xm - 3, ym + 2)
  CASE ET
    LINE (xe, yb)-STEP(12, -12)
    LINE (xe, yc)-STEP(12, 12)
    LINE (xd, yb)-STEP(-12, -12)
    LINE (xd, yc)-STEP(-12, 12)
    CIRCLE (xm, ym), 28, , , , .6
    CIRCLE (xm - 10, ym - 5), 7
    CIRCLE STEP(0, 0), 2
    PAINT STEP(0, 0)
    CIRCLE (xm + 10, ym - 5), 7
    CIRCLE STEP(0, 0), 2
    PAINT STEP(0, 0)
    LINE (xm - 9, ym + 7)-(xm + 9, ym + 12), , B
    FOR controle = 1 TO 5
      LINE STEP(-3, 0)-STEP(0, -4)
      DRAW "BD4"
    NEXT
  CASE Beto
    CIRCLE STEP(5, 5), 30, , pi / 4, pi / 2, 1.3
    CIRCLE STEP(-5, 10), 40, , pi / 2 - .14, 5 * pi / 6, 1.5
    CIRCLE STEP(-11, -19), 30, , pi, 5 * pi / 4 + .3, 2.5
    CIRCLE (xm + 1, ym - 17), 20, , 3 * pi / 2, , .3
    CIRCLE (xm + 8, ym - 4), 5, , , , .7
    PSET STEP(6, -1)
    PAINT STEP(-6, 1)
    LINE STEP(-6, 0)-STEP(-10, -2)
    FOR controle = 2 TO 12 STEP 2
      IF controle > 8 THEN j! = .3
      CIRCLE (xm + 4, ym - 15 + controle), 20, , pi / 4 + j!, 3 * pi / 4 + .3, .5
    NEXT
    CIRCLE (xm + 15, ym + 7), 3, , 3 * pi / 2 - .4, pi / 2 - .2, 1.1
    CIRCLE (xm + 12, ym + 15), 15, , pi + .4, 3 * pi / 2 + .3 - .4, .18
    CIRCLE (xm - 4, ym + 5), 30, , .03, pi / 6 + .1, 1.5
    CIRCLE (xm - 4, ym + 5), 30, , 11 * pi / 6 - .1, 2 * pi - 1.1 / 6, 1.5
END SELECT

END SUB

SUB DRAWtempo (d$)
'Desenha o logotipo com "Tempo"

'OBS: essa var de controle da' "conflito" de proposito!
FOR controle = 1 TO LEN(d$)
  'Pega cada caractere da sequencia, um por um
  car$ = MID$(d$, controle, 1)
  SELECT CASE car$
    'Se for de deslocamento, vai desenhar so' ele nesse loop
    CASE "D", "E", "F", "G", "H", "L", "M", "R", "U"
      draw$ = draw$ + car$
      DO
        controle = controle + 1
        car$ = MID$(d$, controle, 1)
        'Ve ate' onde tem numero e para por la'
        SELECT CASE car$
          CASE "0" TO "9": draw$ = draw$ + car$
          CASE ELSE: EXIT DO
        END SELECT
      LOOP
      'Volta para poder continuar no lugar certo onde parou
      controle = controle - 1
      DRAW draw$: Tempo .001
      draw$ = ""
    CASE ELSE: draw$ = draw$ + car$
  END SELECT
NEXT

END SUB

SUB EditorDeFase
'Contem o editor de fases

'Estranho essa var VVVVV
'naoescrever: controla se deve ou nao escrever as "instrucoes", la' em baixo
STATIC naoescrever
'variaveis importantes, compartilhadas com o modulo principal
SHARED jaeditou, jasalvou, abrarq, quasesalvou, baseat$

'Reseta
proteger = F
abrarq = F

'Vai logo Editar nesses casos
IF abrarq OR quasesalvou THEN GOTO Editar

ComecoEditor: 'Comeco das "instrucoes executaveis" (como se fosse)

'Inicia o cursor se necessario
IF csAG.l = 0 AND csAG.c = 0 THEN csAG.l = 9: csAG.c = 20

'Enche a tela se necessario
IF NOT jaeditou THEN EncherTela
IF protegida THEN 'A.E.
  MsgTempo 23, "Fase protegida contra ediá∆o!"
  protegida = F 'Reseta
  GOTO Editar 'Volta sem fazer nada
END IF

FOR l = 2 TO 17
  FOR c = 2 TO 39
    IF jaeditou THEN 'Se ja passou por aki, o objeto ja' esta' na telaedt()
      obj = telaedt(l, c)
      IF obj >= 1 AND obj <= 4 THEN
        IF csAG.l = l AND csAG.c = c THEN
            cor = corcursor 'O cursor coincide com o objeto
          ELSE
            cor = cor(obj)  'O oposto
        END IF
        COLOR cor
        LOCATE l, c: PRINT desenho(obj);
      END IF
     
      ELSE telaedt(l, c) = telajg(l, c) 'Se nao, pega da telajg() (que o
                                        'EncherTela ja preencheu)
    END IF
  NEXT
NEXT
IF jaeditou THEN
  COLOR corcursor
  LOCATE csAG.l, csAG.c: PRINT desenho(telaedt(csAG.l, csAG.c));

  GOSUB EscreverLinhas
 
  ELSE jaeditou = V
END IF

'Escrever as linhas se for o caso
IF NOT naoescrever THEN GOSUB EscreverLinhas: naoescrever = V

Editar: 'Comeca o editor propriamente dito
DO

  LimpaBuffer
  DO: I$ = UCASE$(INKEY$): LOOP WHILE I$ = ""

  csAN = csAG
  SELECT CASE I$
 
    'Movimentacao do cursor
    CASE cima$:     IF csAG.l > 2 THEN csAG.l = csAG.l - 1
    CASE baixo$:    IF csAG.l < 17 THEN csAG.l = csAG.l + 1
    CASE esquerda$: IF csAG.c > 2 THEN csAG.c = csAG.c - 1
    CASE direita$:  IF csAG.c < 39 THEN csAG.c = csAG.c + 1
    CASE home$: csAG.c = 2
    CASE end$:  csAG.c = 39
    CASE pgup$: csAG.l = 2
    CASE pgdn$: csAG.l = 17

    CASE "0" TO "9" 'Teclas de objeto
      obj = VAL(I$)
      'So' vai pro PorObjeto se nao for o mesmo objeto daquela posicao
      IF obj <> telaedt(csAG.l, csAG.c) THEN GOSUB PorObjeto
    CASE "N" 'Nova fase
      COLOR corpadrao: opc$ = UmaTecla("Apagar todos os objetos", F, 23, F)
      ApagarLinha 23
      IF opc$ = "S" THEN
        'Zera tudo
        csAG.l = 0: csAG.c = 0
        abrir = F: jaeditou = F: jasalvou = F: jgdfs(0, 2) = 0: ZerarPos
        baseat$ = "": arqa$ = "Modelo.de.fase.vazia"
        GOTO ComecoEditor
      END IF
    CASE "A" 'Abrir
      abrarq = V
      COLOR corpadrao: LOCATE 23
      'Sai da SUB pra pegar o algoritmo de abrir la' fora
      EXIT SUB
    CASE "S", "P" 'Salvar/Proteger
      'Verifica se ja' colocou todos os objetos antes de permitir
      IF jaobj(1) AND jaobj(2) AND jaobj(4) AND jgdfs(0, 2) > 0 THEN
        'Verifica se nao ha' setas ilegais
        IF NOT SetaIlegal THEN
          IF I$ = "P" THEN proteger = V
          'Sai e vai salvar la' fora
          EXIT SUB
        END IF
      END IF
    CASE "D": GOSUB Deslocar 'A.E.
    CASE "T" 'Teste
      'So' deixa se ja' tiver o carinha na tela
      IF jaobj(1) THEN
        'Testa a seta ilegal
        IF NOT SetaIlegal THEN
          'Apaga o cursor
          COLOR cor(telaedt(csAG.l, csAG.c))
          LOCATE csAG.l, csAG.c: PRINT desenho(telaedt(csAG.l, csAG.c));
         
          'Apaga o IS se nao for o pers I.S.
          IF jaobj(4) AND personagem <> I.S. THEN
            COLOR cor(0)
            LOCATE posIS.l, posIS.c: PRINT desenho(0);
          END IF
          'Apaga as linhas
          FOR controle = 21 TO 19 STEP -1
            ApagarLinha controle
            Tempo .01
          NEXT
          'Depois de tudo, vai testar
          Jogar V
          
          'Se as posicoes do carinha e iniciais forem
          'diferentes e nao houver nada la', apaga
          IF NOT (posAG.l = posIN.l AND posAG.c = posIN.c) AND telaedt(posAG.l, posAG.c) = 0 THEN
            COLOR cor(0)
            LOCATE posAG.l, posAG.c: PRINT desenho(0);
          END IF
          ApagarLinha 21
          GOTO ComecoEditor
        END IF
      END IF
    CASE "J" 'Definicao do numero de jogadas minimo
      COLOR corpadrao
      'Guarda em j o valor anterior, pra voltar a ele se o cara cancelar
      j = jgdfs(0, 2)
      'era o q tinha antes no lugar do j abaixo: ("; LtSt$(jgdfs(0, 2)); ")
      LOCATE 23, 1: PRINT "N£mero de jogadas m°nimo (anterior: "; LtSt$(j); "): "; : jgdfs(0, 2) = IPTfixNum(3, V)
      IF jgdfs(0, 2) = 0 THEN jgdfs(0, 2) = j 'Cancelou
      ApagarLinha 23
    CASE esc$: Sair V, 3
    CASE backsp$
      'Esse exitdo guarda seu valor para dar um EXIT DO la' fora
      exitdo = Recomecar(V, 3)
      IF exitdo THEN
        naoescrever = F
        csAG.l = F: csAG.c = 0
        abrir = F: jaeditou = F: quasesalvou = F: jasalvou = F: jgdfs(0, 2) = 0
        baseat$ = "": arqs$ = "": arqa$ = ""
        EXIT SUB
      END IF
  END SELECT

  'Se o cursor mudou de posicao, desenha o novo e apaga o velho
  IF csAG.l <> csAN.l OR csAG.c <> csAN.c THEN
    COLOR corcursor: LOCATE csAG.l, csAG.c: PRINT desenho(telaedt(csAG.l, csAG.c));
    COLOR cor(telaedt(csAN.l, csAN.c)): LOCATE csAN.l, csAN.c: PRINT desenho(telaedt(csAN.l, csAN.c));
  END IF

LOOP

EscreverLinhas:
  LOCATE 19, 1
  COLOR corcursor
  FOR obj = 0 TO 9
    IF obj > 0 THEN COLOR cor(obj) 'No 0 e' a corcursor, nos outros e' a
                                   'propria cor(obj)
    PRINT LtSt$(obj); "-"; desenho(obj); " "; 'Saida: 0-<obj(0)> 1-<obj(1)>...
  NEXT
  COLOR corpadrao
  Tempo .01
  PRTcent 20, "N-Nova fase A-Abrir S-Salvar D-Deslocar"
  Tempo .01
  PRTcent 21, "T-Testar  P-Proteger  J-Nß de jogadas"
  Tempo .01
RETURN

Deslocar:
  'Grande demais pra ficar no meio do SELECT la' em cima =)
  COLOR corpadrao: PRTcent 23, "Deslocar tela para " + desenho(5) + "," + desenho(6) + "," + desenho(7) + "," + desenho(8) + "?"
  DO
    continuar = F
    SELECT CASE INKEY$
      CASE esc$: ApagarLinha 23: RETURN
      CASE cima$
        FOR dc = 2 TO 39
          buffer = telaedt(2, dc)
          FOR dl = 2 TO 16: telaedt(dl, dc) = telaedt(dl + 1, dc): NEXT
          telaedt(17, dc) = buffer
        NEXT
      CASE baixo$
        FOR dc = 2 TO 39
          buffer = telaedt(17, dc)
          FOR dl = 17 TO 3 STEP -1: telaedt(dl, dc) = telaedt(dl - 1, dc): NEXT
          telaedt(2, dc) = buffer
        NEXT
      CASE esquerda$
        FOR dl = 2 TO 17
          buffer = telaedt(dl, 2)
          FOR dc = 2 TO 38: telaedt(dl, dc) = telaedt(dl, dc + 1): NEXT
          telaedt(dl, 39) = buffer
        NEXT
      CASE direita$
        FOR dl = 2 TO 17
          buffer = telaedt(dl, 39)
          FOR dc = 39 TO 3 STEP -1: telaedt(dl, dc) = telaedt(dl, dc - 1): NEXT
          telaedt(dl, 2) = buffer
        NEXT
      CASE ELSE: continuar = V
    END SELECT
  LOOP WHILE continuar 'Vai ate' pressionar alguma das teclas da lista
  ApagarLinha 23
 
  FOR dl = 2 TO 17
    FOR dc = 2 TO 39
      obj = telaedt(dl, dc)
      'Faz as novas posicoes se for o caso
      SELECT CASE obj
        CASE 1: posIN.l = dl: posIN.c = dc
        CASE 2: posTL.l = dl: posTL.c = dc
        CASE 4: posIS.l = dl: posIS.c = dc
      END SELECT
      'Na corcursor se for no cursor e cor(obj) se nao
      IF csAG.l = dl AND csAG.c = dc THEN cor = corcursor ELSE cor = cor(obj)
      COLOR cor
      LOCATE dl, dc: PRINT desenho(obj);
    NEXT
  NEXT

RETURN


PorObjeto:
  'Idem: grande demais pra ir la' em cima =P

  naochec = F: pcsl = F: pcsc = F
  SELECT CASE obj
    CASE 5, 6: pcsl = V
    CASE 7, 8: pcsc = V
    CASE 9
    CASE ELSE: naochec = V
  END SELECT
  IF NOT naochec THEN 'Se for uma seta ou parede, cheque
    obst9l = (obj = 9 AND (telaedt(csAG.l + 1, csAG.c) = 5 OR telaedt(csAG.l + 1, csAG.c) = 6 OR telaedt(csAG.l - 1, csAG.c) = 5 OR telaedt(csAG.l - 1, csAG.c) = 6))
    obst9c = (obj = 9 AND (telaedt(csAG.l, csAG.c + 1) = 7 OR telaedt(csAG.l, csAG.c + 1) = 8 OR telaedt(csAG.l, csAG.c - 1) = 7 OR telaedt(csAG.l, csAG.c - 1) = 8))
    linear = ObstLin(telaedt(csAG.l + pcsl, csAG.c + pcsc), obj) OR ObstLin(telaedt(csAG.l - pcsl, csAG.c - pcsc), obj)
    lateral = (ObstLat(telaedt(csAG.l + NOT pcsl, csAG.c + NOT pcsc), obj) OR ObstLat(telaedt(csAG.l - NOT pcsl, csAG.c - NOT pcsc), obj))
    IF linear OR lateral OR obst9l OR obst9c THEN 'Deu seta ilegal
      'Faz piscar pra avisar
      FOR controle = 1 TO 6
        IF mudacor THEN cor = cor(obj) ELSE cor = cor(10)
        COLOR cor
        LOCATE csAG.l, csAG.c: PRINT desenho(obj);
        Tempo .15
        mudacor = NOT mudacor
      NEXT
      'Volta `a corcursor
      COLOR corcursor
      LOCATE csAG.l, csAG.c: PRINT desenho(telaedt(csAG.l, csAG.c));
      RETURN
    END IF
  END IF

  'Zera as posicoes se elas forem sobrescritas por outro objeto
  IF posIN.l = csAG.l AND posIN.c = csAG.c THEN posIN.l = 0: posIN.c = 0
  IF posTL.l = csAG.l AND posTL.c = csAG.c THEN posTL.l = 0: posTL.c = 0
  IF posIS.l = csAG.l AND posIS.c = csAG.c THEN posIS.l = 0: posIS.c = 0

  SELECT CASE obj
    '1, 2 e 4: se ja' houver um daquele objeto anteriormente, some com o anterior
    CASE 1
      posINan = posIN: posIN = csAG
      IF (posIN.l <> posINan.l OR posIN.c <> posINan.c) AND posINan.l > 0 AND posINan.c > 0 THEN
        telaedt(posINan.l, posINan.c) = 0
        COLOR cor(0)
        LOCATE posINan.l, posINan.c: PRINT desenho(0);
      END IF
    CASE 2
      posTLan = posTL: posTL = csAG
      IF (posTL.l <> posTLan.l OR posTL.c <> posTLan.c) AND posTLan.l > 0 AND posTLan.c > 0 THEN
        telaedt(posTLan.l, posTLan.c) = 0
        COLOR cor(0)
        LOCATE posTLan.l, posTLan.c: PRINT desenho(0);
      END IF
    CASE 4
      posISan = posIS: posIS = csAG
      IF (posIS.l <> posISan.l OR posIS.c <> posISan.c) AND posISan.l > 0 AND posISan.c > 0 THEN
        telaedt(posISan.l, posISan.c) = 0
        COLOR cor(0)
        LOCATE posISan.l, posISan.c: PRINT desenho(0);
      END IF
  END SELECT

  telaedt(csAG.l, csAG.c) = obj
  COLOR corcursor
  LOCATE csAG.l, csAG.c: PRINT desenho(obj);

RETURN

END SUB

SUB EncherTela
'Enche a tela com seu conteudo (objetos)

IF abrir AND NOT jaabriu THEN
  OPEN arqa$ FOR INPUT AS #1
  IF faseexterna THEN jaabriu = V 'jaabriu so' faz diferenca quando e' faseexterna
END IF

IF abriusalvo THEN
  comeco = 1 'o laco FOR acontece (numfases) vezes
  PosSalvada$ = ""
  abriusalvo = F

  ELSE comeco = fase 'o laco FOR acontece so' uma vez
END IF

'Se for uma fase vazia (que esta' sendo editada), zera toda a tela
IF arqa$ = "Modelo.de.fase.vazia" THEN
  FOR l = 2 TO 17
    FOR c = 2 TO 39
      telajg(l, c) = 0
    NEXT
  NEXT
  
  ELSE 'Senao, le os objetos e faz toda a verificacao

    FOR controle = comeco TO fase 'Le a tela inteira uma vez para cada fase
     
      ZerarPos
  
      FOR l = 2 TO 17
        FOR c = 2 TO 39
         
          IF abrir THEN
9           INPUT #1, obj
10          ELSE READ obj
11        END IF
  
          'Faz a checagem de setas ilegais
          naochec = F: pcsl = F: pcsc = F
          SELECT CASE obj
            CASE 5, 6: pcsl = V
            CASE 7, 8: pcsc = V
            CASE 9, 10
            CASE ELSE: naochec = V
          END SELECT
          IF NOT naochec THEN
            obstpardl = ((obj = 9 OR obj = 10) AND (telajg(l - 1, c) = 5 OR telajg(l - 1, c) = 6))
            obstpardc = ((obj = 9 OR obj = 10) AND (telajg(l, c - 1) = 7 OR telajg(l, c - 1) = 8))
            linear = ObstLin(telajg(l + pcsl, c + pcsc), obj)
            lateral = ObstLat(telajg(l + NOT pcsl, c + NOT pcsc), obj)
            IF linear OR lateral OR obstpardl OR obstpardc THEN ERROR 101
          END IF
 
          SELECT CASE obj
            CASE 1: IF NOT jaobj(1) THEN posIN.l = l: posIN.c = c ELSE ERROR 102
            CASE 2: IF NOT jaobj(2) THEN posTL.l = l: posTL.c = c ELSE ERROR 103
            CASE IS < 0, 4, IS > 9, IS <> INT(obj): ERROR 104
          END SELECT
        
          'Apos todas as checagens, etc e tal, coloca na matriz tela
          telajg(l, c) = obj
        NEXT
      NEXT
 
      IF abrir THEN
12      INPUT #1, numero$, separador$
        IF NOT faseexterna THEN CLOSE #1
        ELSE READ numero$
      END IF

      parcj1 = VAL(PedacoNumero(28))
      parcj2 = VAL(PedacoNumero(1))

      d1j1$ = PedacoNumero(15)
      d2j1$ = PedacoNumero(32)
      d3j1$ = PedacoNumero(10)
      j1 = VAL(d1j1$ + d2j1$ + d3j1$) - parcj1 - 342
      IF j1 < 0 THEN j1 = j1 + 1000

      d1j2$ = PedacoNumero(6)
      d2j2$ = PedacoNumero(22)
      d3j2$ = PedacoNumero(21)
      j2 = VAL(d1j2$ + d2j2$ + d3j2$) - parcj2 - 537
      IF j2 < 0 THEN j2 = j2 + 1000

      IF j1 <> j2 THEN ERROR 107
      jgdfs(controle, 2) = j2
 
      IF NOT jaobj(1) THEN ERROR 105
      IF NOT jaobj(2) THEN ERROR 106

13
      parcIS1 = VAL(PedacoNumero(17))
      parcIS2 = VAL(PedacoNumero(33))
      parcIS3 = VAL(PedacoNumero(9))
      parcIS4 = VAL(PedacoNumero(7))

      d1l1$ = PedacoNumero(14)
      d2l1$ = PedacoNumero(24)
      l1 = VAL(d1l1$ + d2l1$) - parcIS1 - 43
      d1l2$ = PedacoNumero(19)
      d2l2$ = PedacoNumero(4)
      l2 = VAL(d1l2$ + d2l2$) - parcIS2 - 43

      d1c1$ = PedacoNumero(18)
      d2c1$ = PedacoNumero(5)
      c1 = VAL(d1c1$ + d2c1$) - parcIS3 - 28
      d1c2$ = PedacoNumero(12)
      d2c2$ = PedacoNumero(29)
      c2 = VAL(d1c2$ + d2c2$) - parcIS4 - 28

      IF l1 <> l2 OR c1 <> c2 THEN ERROR 107

      prot(1) = VAL(PedacoNumero(2))
      prot(2) = VAL(PedacoNumero(11))
      prot(3) = VAL(PedacoNumero(16))
      prot(4) = VAL(PedacoNumero(23))
      prot(5) = VAL(PedacoNumero(27))
      prot(6) = VAL(PedacoNumero(30))
      FOR controle2 = 1 TO 5
        IF Par(prot(controle2)) EQV Par(prot(controle2 + 1)) THEN ERROR 107
        IF (Par(controle2) EQV Par(prot(controle2))) AND abrir AND NOT faseexterna THEN protegida = V: EXIT SUB
      NEXT

      'Pega a posicao do IS
      posIS.l = l1: posIS.c = c1
      telajg(posIS.l, posIS.c) = 4
14
    NEXT
END IF

'Desenha na tela efetivamente
FOR l = 2 TO 17
  'Coloca o cursor na primeira casa da linha (l, 2)
  LOCATE l, 2
  FOR c = 2 TO 39
    obj = telajg(l, c)
    cor = cor(obj)
    'Tem cursor: esta' editando
    IF csAG.l > 0 AND csAG.c > 0 THEN
      'Coloca na corcursor se coincidirem as posicoes
      IF csAG.l = l AND csAG.c = c THEN cor = corcursor
     
      'Se for IS, nao poe na tela, a menos que esteja jogando com o I.S.
      'Se for o carinha, tambem nao poe na tela
      ELSEIF (obj = 4 AND personagem <> I.S.) OR obj = 1 THEN obj = 0: cor = cor(0)
    END IF
    COLOR cor: PRINT desenho(obj);
  NEXT
NEXT

END SUB

SUB EscolherCarinha
'Mostra a tela de selecao de carinha

DIM casa(numpsgtot), psgdacasa(primeirosec TO numpsgtot)

'Cuidam da tabela
topocima$ = "…"
FOR controle = 1 TO numpsgin - 1
  topocima$ = topocima$ + "ÕÀ"
NEXT
topocima$ = topocima$ + "Õª"

meiocima$ = "∫"
FOR controle = 1 TO numpsgin
  meiocima$ = meiocima$ + CHR$(ascii(controle)) + "∫"
NEXT

pontacima$ = "»"
FOR controle = 1 TO numpsgin - 1
  pontacima$ = pontacima$ + "Õ "
NEXT
pontacima$ = pontacima$ + "Õº"

COLOR cortabela
PRTcent linhameio - 1, topocima$
LOCATE linhameio, INT(21 - LEN(pontacima$) / 2)
FOR controle = 1 TO LEN(meiocima$)
  pedaco$ = MID$(meiocima$, controle, 1)
  IF pedaco$ = "∫" THEN cor = cortabela ELSE cor = cor(1)
  COLOR cor: PRINT pedaco$;
NEXT
PRTcent linhameio + 1, pontacima$

casa(1) = INT(21 - LEN(meiocima$) / 2) + 1
FOR controle = 2 TO numpsgin
  casa(controle) = casa(controle - 1) + 2
NEXT

meiobaixo$ = "∫"
FOR controle = primeirosec TO numpsgtot
  IF secpegou(controle) THEN
    numsecp = numsecp + 1
    meiobaixo$ = meiobaixo$ + CHR$(ascii(controle)) + "∫"
  END IF
NEXT

IF numsecp > 0 THEN 'Tem pelo menos 1 secreto

  pontabaixo$ = "»"
  FOR controle = 1 TO numsecp - 1
    pontabaixo$ = pontabaixo$ + "Õ "
  NEXT
  pontabaixo$ = pontabaixo$ + "Õº"

  parimpar = (Par(numpsgin) EQV Par(numsecp))
  FOR controle = 1 TO numsecp + 1
 
    SELECT CASE CHR$(SCREEN(linhameio + 1, INT(21 - LEN(pontabaixo$) / 2) + (controle - 1) * 2))
      CASE " ": IF parimpar THEN pedaco1$ = "Œ" ELSE pedaco1$ = " "
      CASE "Õ": IF parimpar THEN pedaco1$ = "Õ" ELSE pedaco1$ = "À"
    END SELECT
    SELECT CASE CHR$(SCREEN(linhameio + 1, INT(21 - LEN(pontabaixo$) / 2) + (controle - 1) * 2 + 1))
      CASE " ": IF parimpar THEN pedaco2$ = "Œ" ELSE pedaco2$ = " "
      CASE "Õ": IF parimpar THEN pedaco2$ = "Õ" ELSE pedaco2$ = "À"
    END SELECT

    topobaixo$ = topobaixo$ + pedaco1$ + pedaco2$

  NEXT

  PRTcent linhameio + 1, topobaixo$
  LOCATE linhameio + 2, INT(21 - LEN(pontabaixo$) / 2)
  FOR controle = 1 TO LEN(meiobaixo$)
    pedaco$ = MID$(meiobaixo$, controle, 1)
    IF pedaco$ = "∫" THEN cor = cortabela ELSE cor = cor(1)
    COLOR cor: PRINT pedaco$;
  NEXT
  PRTcent linhameio + 3, pontabaixo$

  indice = primeirosec - 1
  FOR controle = primeirosec TO numpsgtot
    IF secpegou(controle) THEN
      indice = indice + 1
      IF indice = primeirosec THEN
        casa(indice) = INT(21 - LEN(meiobaixo$) / 2) + 1
        ELSE casa(indice) = casa(indice - 1) + 2
      END IF
      psgdacasa(indice) = controle
    END IF
  NEXT

END IF

'MB faz tocar a musica em 2ß plano
PLAY "MB": IF NOT pratico THEN PLAY " L13cccL11c+L14dddedfL10eL14ddL5d"
PRTmov linhameio - 4, 0, "Escolha seu personagem!"
buffer = primeirosec

'Iniciacoes: do cursor, do pers, desenha o pers 1, o cursor, o nome...
cursor = 1
personagem = 1
cor = corquadr1
Quadrinho cor, cursor
DesenharCarinha 1
COLOR cortabela: PRTmov linhanome, 0, nomepsg$(1)

tp! = TIMER 'inicia tp!
DO

  LimpaBuffer
  DO
    I$ = INKEY$
    'Ao passar (IntermitenciaCursor) segundo(s)
    IF TIMER - tp! >= IntermitenciaCursor THEN
      'inverte o valor de mudacor
      mudacor = NOT mudacor
      'Muda a cor
      IF mudacor THEN cor = corquadr2 ELSE cor = corquadr1
      'Desenha o quadrinho
      Quadrinho cor, cursor
 
      'atribui a tp! o novo valor de timer
      tp! = TIMER
    END IF
  LOOP WHILE I$ = ""
 
  LinhaDeBaixoAN = LinhaDeBaixo: personagemAN = personagem: cursorAN = cursor
  SELECT CASE UCASE$(I$)
    'Decidir se poe ou nao coisa aki
    '  CASE backsp$
    CASE esquerda$
      IF cursor = 1 OR cursor = primeirosec THEN cursor = UltimoPsg ELSE cursor = cursor - 1
    CASE direita$
      IF cursor = UltimoPsg THEN
        IF LinhaDeBaixo THEN cursor = primeirosec ELSE cursor = 1
        ELSE cursor = cursor + 1
      END IF
    CASE cima$, baixo$
      IF numsecp > 0 THEN
        SWAP cursor, buffer
        LinhaDeBaixo = NOT LinhaDeBaixo
      END IF
    CASE enter$
      'Apaga o desenho
      DesenharCarinha 0
      'Zera
      numsecp = 0
      LinhaDeBaixo = F
      EXIT SUB
    CASE esc$: Sair V, 0
  END SELECT
  'Se for na linha dos secretos, e' o psgdacasa, senao e' o proprio cursor
  IF LinhaDeBaixo THEN personagem = psgdacasa(cursor) ELSE personagem = cursor

  IF personagem <> personagemAN THEN 'Mudou
  
    'Apaga o antigo (desenha o quadrinho com a cortabela)
    Quadrinho cortabela, cursorAN
  
    COLOR cortabela
    'Apaga a linha do nome se o nome novo for menor do que o velho
    IF LEN(nomepsg$(personagem)) < LEN(nomepsg$(personagemAN)) THEN ApagarLinha linhanome
    PRTcent linhanome, nomepsg$(personagem)
    DesenharCarinha personagem
  
    'Desenha o novo quadrinho
    Quadrinho cor, cursor
    'Nota: essa "cor" e' a mesma de la' de cima! O valor dela permanece
    '      igual ate' aki, para ser usada de novo.
  
  END IF

LOOP

END SUB

SUB HistoriaDoCarinha
'Mostra a historia do carinha

SHARED textohist() AS TextoFujao, txtmesmo$()

textohist(1).cortxt = cor(1)
textohist(1).linha = 3
txtmesmo$(1) = desenho(1) + " --> este Ç voce, o " + nomepsg$(personagem)
textohist(2).cortxt = cor(1)
textohist(2).linha = 14
txtmesmo$(2) = "Fuga escorregadia!"
textohist(3).cortxt = corhist
textohist(3).linha = 16
txtmesmo$(3) = "Pressione qualquer tecla!"

LOCATE 2
'Historia basica
texto$ = nomepsg$(personagem) + " " + hist$(personagem) + ", por isso foi preso... Tudo parecia perdido. A vida nao tinha mais sentido!"
texto$ = texto$ + " Diante disso, AndrÇ espalhou teletransportes pelo lugar! Ai ele viu que podia fugir! E Ç a° que comeáa a grande... "

'Esse pedaco faz a separacao do texto em linhas
Ps = 1: n = 1
DO
  itr = INSTR(Ps, texto$, " ")
  IF itr - 1 - itra > 38 OR itr = 0 THEN
    truncado$(n) = MID$(texto$, itra + 1, Ps - itra - 2)
    n = n + 1
    itra = Ps - 1
    IF itr = 0 THEN truncado$(n) = MID$(texto$, itra + 1): EXIT DO
  END IF
  Ps = itr + 1
LOOP

COLOR textohist(1).cortxt
PRTmov textohist(1).linha, -1, txtmesmo$(1)

'Um dos prints abaixo anula o efeito do ; no PRTmov, e o outro abaixa a linha
PRINT : PRINT
Tempo 1

'Musiquinha da historia
IF NOT pratico THEN PLAY "O2 L20AL15GL3A P10 L8GL14FEDL3C#L2D P5 < L20AL15GL2A P10 L6EFL3C#L2D >"
COLOR corhist
FOR controle = 1 TO n
  LOCATE , 2: PRINT truncado$(controle) 'Truncado contem cada linha
  Tempo .25
NEXT
Tempo 7.5

COLOR textohist(2).cortxt
PRTmov textohist(2).linha, -1, txtmesmo$(2)
Tempo .6

COLOR textohist(3).cortxt
PRTmov textohist(3).linha, -1, txtmesmo$(3)

LimpaBuffer
Pausa

FOR controle = 5 TO n + 3
  'Apaga cada linha sem apagar a parede
  LOCATE controle, 2: PRINT SPACE$(38);
  Tempo .01
NEXT

Tempo .08


'Textos que saem rolando da tela

'Determina o texto de maior tamanho
maior = textohist(1).ultcol
idomaior = 1
FOR controle = 1 TO 3
  textohist(controle).tam = LEN(txtmesmo$(controle))
  textohist(controle).ultcol = INT(21 + textohist(controle).tam / 2)
 
  'descobre o maior deles pra ser o ultimo a terminar de ser fujao
  IF textohist(controle).ultcol > maior THEN
    maior = textohist(controle).ultcol
    idomaior = controle
  END IF
NEXT

DO
  'pega cada indice e diminui 1 no valor da ultima coluna
  FOR controle = 1 TO 3
    textohist(controle).ultcol = textohist(controle).ultcol - 1
  NEXT
  FOR controle = 1 TO 3
    'tamanho do texto
    tam = LEN(txtmesmo$(controle))
    'Se ele nao for nulo, escreve
    IF tam > 0 THEN
      primcol = textohist(controle).ultcol - textohist(controle).tam
      IF primcol < 2 THEN primcol = 2: txtmesmo$(controle) = RIGHT$(txtmesmo$(controle), tam - 1)
      LOCATE textohist(controle).linha, primcol
      COLOR textohist(controle).cortxt
      PRINT txtmesmo$(controle); " "
    END IF
  NEXT
  Tempo .001
LOOP UNTIL textohist(idomaior).ultcol = 2

END SUB

SUB ImpJogadas (aumento)
'Escreve o # de jogadas

15 jogadas = jogadas + aumento
16 jogadas$ = LtSt$(jogadas)

COLOR corpadrao
LOCATE 21, 17 - LEN(jogadas$): PRINT jogadas$;

END SUB

SUB ImpPontos (aumento)
'Escreve a pontuacao

17 pontos = pontos + aumento
18 COLOR corpadrao
LOCATE 21, 32: PRINT pontos

END SUB

SUB inuteis
'Colocar aki as coisas comentadas, inuteis por enquanto.


'Usar pra fazer uma cor mudar sempre (pra testar todas as possiveis)
'ja = ja + 1
'IF ja >= 6 THEN ja = 0: cor2 = cor2 + 1
'IF cor2 > 15 THEN cor2 = 1

'Do EscolherCarinha:
  
     'Serve pra testar os varios modos de destacar o carinha selecionado
     '>td
     'pra testes!
     'Quadrinho Amarela, 3
     'Quadrinho Vermelha, 5
     'Quadrinho cor, 7
     'td<

'So' util pra saber em qual linha esta' o carinha que sera' colocado em
'cor(1) e o que sera' em corcursor, por exemplo
'linha1 = linhameio + 2: linha2 = linhameio
'IF LinhaDeBaixo THEN SWAP linha1, linha2

'Util se for colocar que o carinha e' selecionado num cor diferente de cor(1)
'
'isso e' no comeco (a iniciacao)
'COLOR corquadr1: LOCATE linhameio, casa(1): PRINT CHR$(ascii(1));
'
'E esse e' no meio, quando troca de carinha
'COLOR cor(1)
'LOCATE linha1, casa(cursorAN): PRINT CHR$(ascii(personagemAN));
'COLOR corcursor
'LOCATE linha2, casa(cursor): PRINT CHR$(ascii(personagem));

'Util so' se for fazer que o carinha pisca
'   'Se nao for a cor original, volta pra ela, e coloca ela no pers novo
'   IF cor = corquadr1 THEN
'     COLOR cor(1)
'     LOCATE , casa(cursorAN)
'     PRINT CHR$(ascii(personagemAN));
'     COLOR cor
'     LOCATE , casa(cursor)
'     PRINT CHR$(ascii(personagem));
'   END IF

'serve pra por um ponto na tela e controla'-lo pra achar posicoes de X e Y
'x = 87: y = 56
'xa = x: ya = y
'SELECT CASE i$
'CASE cima$: y = y - 1
'CASE baixo$: y = y + 1
'CASE direita$: x = x + 1
'CASE esquerda$: x = x - 1
'CASE "w": y = y - 5
'CASE "a": x = x - 5
'CASE "s": y = y + 5
'CASE "d": x = x + 5
'END SELECT
'IF xa <> x OR ya <> y THEN
'PSET (xa, ya), Preta
'PSET (x, y), Vermelha
'LOCATE 24, 1: PRINT "x="; x, "y="; y;
'END IF

END SUB

FUNCTION IPTfix$ (texto$, lmax, apgtralhas) ', tpsair)
'Substitui com vantagens o INPUT

'Nota: apgtralhas e' parametro booleano


PRINT texto$; ": ";
colunin = POS(0)
ipt$ = SPACE$(lmax)
LOCATE , colunin: PRINT "€";
IF apgtralhas THEN PRINT SPACE$(39 - colunin); : LOCATE , colunin + 1
LimpaBuffer

DO
  DO: I$ = INKEY$: LOOP WHILE I$ = ""

  SELECT CASE I$
    CASE backsp$
      IF lenipt THEN
        LOCATE , colunin + lenipt: PRINT " ";
        LOCATE , colunin + lenipt - 1: PRINT "€";
        MID$(ipt$, lenipt) = " "
        lenipt = lenipt - 1
      END IF
    CASE enter$: EXIT DO
    CASE esc$
      ApagarLinha CSRLIN
      IPTfix$ = esc$
      EXIT FUNCTION
    CASE CHR$(32) TO CHR$(255)
      IF lenipt < lmax THEN
        LOCATE , colunin + lenipt: PRINT I$; "€";
        lenipt = lenipt + 1
        MID$(ipt$, lenipt) = I$
      END IF
  END SELECT
LOOP

LOCATE , colunin + lenipt: PRINT " ";

IPTfix$ = RTRIM$(ipt$)

END FUNCTION

FUNCTION IPTfixNum (lmax, apgtralhas) ', tpsair)
'Igual IPTfix, mas pra entrada de numeros

'Nota: apgtralhas e' parametro booleano


colunin = POS(1)
ipt$ = SPACE$(lmax)
LOCATE , colunin: PRINT "€";
IF apgtralhas THEN PRINT SPACE$(39 - colunin); : LOCATE , colunin + 1
LimpaBuffer

DO
  DO: I$ = INKEY$: LOOP WHILE I$ = ""

  SELECT CASE I$
    CASE backsp$
      IF lenipt THEN
        LOCATE , colunin + lenipt: PRINT " ";
        LOCATE , colunin + lenipt - 1: PRINT "€";
        MID$(ipt$, lenipt) = " "
        lenipt = lenipt - 1
      END IF
    CASE enter$: IF VAL(ipt$) THEN EXIT DO
    CASE esc$
      ApagarLinha CSRLIN
      EXIT FUNCTION
    CASE "0" TO "9"
      IF lenipt < lmax THEN
        LOCATE , colunin + lenipt: PRINT I$; "€";
        lenipt = lenipt + 1
        MID$(ipt$, lenipt) = I$
      END IF
  END SELECT
LOOP

LOCATE , colunin + lenipt: PRINT " ";
IPTfixNum = VAL(ipt$)

END FUNCTION

FUNCTION jaobj (obj)
'Determina se o Inicio, Teletransporte ou IS ja' tem posicao definida

SELECT CASE obj
  CASE 1: jaobj = (posIN.l > 0 AND posIN.c > 0)
  CASE 2: jaobj = (posTL.l > 0 AND posTL.c > 0)
  CASE 4: jaobj = (posIS.l > 0 AND posIS.c > 0)
END SELECT

END FUNCTION

SUB Jogar (testandofase)
'Contem todo o algoritmo do jogo em si

'jamf: se ja' deu PLAY "MF" (sons em 1ß plano)
STATIC jamf

IF NOT abriusalvo THEN
  IF PosSalvada$ <> "" THEN PosSalvada$ = "": GOTO Jogo 'Isso acontece quando salva
  IF NOT testandofase THEN fase = 1: IStotal = 0
  pontos = 100
END IF

ComecoJogar:
IF NOT testandofase AND NOT reiniciar THEN EncherTela
FOR l = 2 TO 17
  FOR c = 2 TO 39
    IF reiniciar THEN 'O cara apertou R
      IF testandofase THEN obj = telaedt(l, c) ELSE obj = copiatelajg(l, c)
      IF obj = 3 OR obj = 4 THEN
        telajg(l, c) = obj
        IF obj <> 4 THEN COLOR cor(obj): LOCATE l, c: PRINT desenho(obj);
      END IF
     
      'testando a fase
      ELSEIF testandofase THEN telajg(l, c) = telaedt(l, c)
      'nada: so' guardar uma copia da tela
      ELSE copiatelajg(l, c) = telajg(l, c)
    END IF
  NEXT
NEXT
telajg(posIN.l, posIN.c) = 0

COLOR corpadrao
IF reiniciar THEN
    LOCATE 21, 12: PRINT "    0"; 'Coloca 0 jogadas
    pontos = pontosAT: LOCATE 21, 32: PRINT pontos; "   "; 'Volta os pontos
    IStotal = IStotalAT 'Volta o IStotal
    arrastou = arrastouAT 'idem
    reiniciar = F
  ELSE 'normal, entrando na fase pela 1¶ vez
    j1$ = "Jogadas:    0/" + LtSt$(jgdfs(fase, 2))
    j2$ = j1$ + SPACE$(21 - LEN(j1$)) + "Pontos: " + LtSt$(pontos)
    IF NOT testandofase THEN
      PRTmov 19, 0, "Fase: " + LtSt$(fase)
      PRTmov 21, 4, j2$
      Tempo .5
     
      ELSE LOCATE 21, 4: PRINT j2$
    END IF
    pontosAT = pontos: IStotalAT = IStotal: arrastouAT = arrastou
END IF
jogadas = 0

posAG = posIN
IF NOT testandofase THEN PiscarCarinha V

IF NOT jamf THEN PLAY "MF": jamf = V
Jogo:
DO

  LimpaBuffer
  DO: I$ = INKEY$: LOOP WHILE I$ = ""

  SELECT CASE UCASE$(I$)
    CASE cima$, baixo$, esquerda$, direita$
      IF TerminouFase(I$, testandofase) THEN 'Isso vai no negocio de andar
        PLAY som$(2)
        Tempo .2
        IF mssgarr THEN 'Esta' na tela a msgarr
          ApagarLinha 23
          msgarr = F
        END IF
        Tempo .1
        IF NOT testandofase THEN
          ApagarLinha 21: Tempo .1: ApagarLinha 19: Tempo .15
          PiscarCarinha F
          jgdfs(fase, 1) = jogadas
         
          IF faseexterna THEN
              IF EOF(1) THEN 'Fim das fases externas
                CLOSE #1
                ZerouJogo V
                GOTO Recomecar
              END IF
            ELSEIF fase = numfases THEN 'Fases do jogo
              ZerouJogo F
              GOTO Recomecar
          END IF

          fase = fase + 1
          COLOR corpadrao
          PRTcent 20, "Pressione qualquer tecla"
          PRTcent 21, "para ir Ö fase" + STR$(fase)
          LimpaBuffer
          Pausa
          ApagarLinha 21: Tempo .1: ApagarLinha 20: Tempo .2
          GOTO ComecoJogar
         
          ELSE EXIT SUB 'aki: mudar a ordem do IF/ELSE
        END IF 'testandofase
      END IF 'TerminouFase
    CASE esc$
      IF msgarr THEN ApagarLinha 23: msgarr = F
      IF NOT testandofase THEN
        Sair F, 1
       
        ELSE EXIT SUB
      END IF
    CASE backsp$
      IF NOT testandofase THEN
        IF Recomecar(V, 1) THEN
Recomecar:
          fase = 0: jamf = F
          FOR controle = 1 TO fase
            jgdfs(controle, 1) = 0 'Zera as jogadas das fases - talvez inutil
          NEXT
          IF faseexterna THEN
              CLOSE #1
              abrir = F
              faseexterna = F
              jaabriu = F
            ELSE
              RESTORE fases
          END IF
          EXIT SUB
        END IF
      END IF
    CASE "R" 'Reiniciar
        'amigavel aki
      IF jogadas > 0 THEN 'So' pode reiniciar se ja' tiver andado
        COLOR corpadrao: opc$ = UmaTecla("Reiniciar a fase", F, 23, F)
        ApagarLinha 23
        msgarr = F 'Apagou a msgarr, entao, se necessario, tera' que reescreve-la
       
        IF opc$ = "S" THEN 'Confirmou
         
          IF testandofase THEN 'Vai rapido se estiver testando a fase
            'Troca o carinha de posicao, se a atual for diferente da inicial
            IF posAG.l <> posIN.l OR posAG.c <> posIN.c THEN
              'apaga o velho
              COLOR cor(0)
              LOCATE posAG.l, posAG.c: PRINT desenho(0);
              'desenha o novo
              COLOR cor(1)
              LOCATE posIN.l, posIN.c
              PRINT desenho(1);
            END IF
         
            ELSE PiscarCarinha F 'Se nao for testandofase, pisca o carinha
          END IF

          reiniciar = V: GOTO ComecoJogar
        END IF
      END IF
    CASE "S" 'Salvar jogo
      'amigavel aki
      IF fase > 1 AND NOT testandofase THEN  'OR faseexterna) THEN 'por isso depois
        COLOR corpadrao: PosSalvada$ = UmaTecla("Salvar na posicao", V, 23, V)
        msgarr = F
        IF PosSalvada$ = esc$ THEN PosSalvada$ = "" ELSE EXIT SUB
        ApagarLinha 23
      END IF
  END SELECT

LOOP

END SUB

FUNCTION Juncao (posicao)

Juncao = CVI(MID$(seqarq$, ordem(posicao, 1), 1) + MID$(seqarq$, ordem(posicao, 2), 1))

END FUNCTION

SUB LimpaBuffer
'Limpa o buffer do teclado
 
DO: LOOP UNTIL INKEY$ = ""

END SUB

FUNCTION LtSt$ (numero)

LtSt$ = LTRIM$(STR$(numero))

END FUNCTION

SUB MsgFim (msg$)

CLS
COLOR corpadrao: PRTcent 12, msg$
END

END SUB

SUB MsgTempo (linha, msg$)

ApagarLinha linha
PRTcent linha, msg$
Tempo 2.2
ApagarLinha linha

END SUB

FUNCTION ObstLat (obj, setaref)

SELECT CASE setaref
 CASE 5, 6: ObstLat = (obj = 7 OR obj = 8)
 CASE 7, 8: ObstLat = (obj = 5 OR obj = 6)
END SELECT

END FUNCTION

FUNCTION ObstLin (obj, setaref)

IF setaref = 9 OR setaref = 10 THEN EXIT FUNCTION
parede = (obj = 9 OR obj = 10)
seta = (obj >= 5 AND obj <= 8)
ObstLin = ((parede OR seta) AND obj <> setaref)

END FUNCTION

FUNCTION Par (numero)

Par = (numero / 2 = numero \ 2)

END FUNCTION

SUB Paredes (tirar, apglinhas)
'Nota: tirar e' parametro booleano

IF tirar THEN
 obj = 0
 SELECT CASE apglinhas
  CASE 1, 3
   IF apglinhas = 3 THEN st = 1 ELSE st = 2
   FOR controle = 21 TO 19 STEP -st
    Tempo .1
    ApagarLinha controle
   NEXT
   Tempo .1
  CASE 2: ApagarLinha 20: Tempo .01
 END SELECT
 ELSE obj = 10
END IF

COLOR cor(obj)
'colunas
FOR controle = 9 TO 2 STEP -1
 ApagarLinha controle: ApagarLinha 19 - controle
 IF NOT tirar THEN
  LOCATE controle, 1: PRINT desenho(10);
  LOCATE 19 - controle, 1: PRINT desenho(10);
  LOCATE controle, 40: PRINT desenho(10);
  LOCATE 19 - controle, 40: PRINT desenho(10);
 END IF
 Tempo .01
NEXT
'linhas
FOR controle = 1 TO 20
 LOCATE 1, controle: PRINT desenho(obj);
 LOCATE 1, 41 - controle: PRINT desenho(obj);
 LOCATE 18, controle: PRINT desenho(obj);
 LOCATE 18, 41 - controle: PRINT desenho(obj);
 Tempo .01
NEXT

END SUB

SUB Pausa
'Pausa o programa ate' uma tecla ser pressionada

DO: LOOP WHILE INKEY$ = ""

END SUB

FUNCTION PedacoNumero$ (posicao)

PedacoNumero$ = MID$(numero$, posicao, 1)

END FUNCTION

SUB PiscarCarinha (aumentar)
'Nota: parametro booleano

IF aumentar THEN co = 1: t! = .015 ELSE co = -1: t! = .165

'                      4 ou 5
'                   /----^^----\
FOR controle = 1 TO co / 2 + 4.5
'                       1        TO        6
'
'                                ou
'
'                       6        TO        1
'                /------^------\    /------^-----\
 FOR controle2 = -2.5 * co + 3.5 TO 2.5 * co + 3.5 STEP co
  IF NOT (co = -1 AND controle2 = 6 AND controle = 1) THEN
   LOCATE posAG.l, posAG.c
   COLOR corpsc(controle2): PRINT desenho(1);
   Tempo t!
   IF controle2 / 2 = controle2 \ 2 THEN t! = t! + co * .015
  END IF
 NEXT
NEXT

IF co = -1 THEN
 LOCATE posAG.l, posAG.c
 COLOR cor(0): PRINT desenho(0);
 Tempo .5
END IF

END SUB

FUNCTION PontoErrado (base$)
 
Ps = 1
DO
 itrp = INSTR(Ps, base$, ".")
 IF itrp = 0 THEN EXIT FUNCTION
 itrb = INSTR(Ps, base$, "\")
 IF itrb = 0 THEN PontoErrado = V: EXIT FUNCTION ELSE Ps = itrb + 1
LOOP UNTIL Ps > LEN(base$)

END FUNCTION

SUB PRTcent (linha, texto$)

LOCATE linha, INT(21 - LEN(texto$) / 2): PRINT texto$;

END SUB

SUB PRTmov (l, col, texto$)

'Indica q e' pra "sair" do 39, e nao do 40
IF col = -1 THEN cf = 39 ELSE cf = 40
'Se for 0 ou -1, e' ate' o centro
IF col <= 0 THEN col = INT(21 - LEN(texto$) / 2)

FOR controle = cf TO col STEP -1
 LOCATE l, controle: PRINT LEFT$(texto$ + " ", cf - controle + 1);
 Tempo .01
NEXT

END SUB

SUB Quadrinho (cor, cursor)
'Desenha o quadrinho na hora de escolher o carinha, usando alguns valores
'"constantes" da posicao dos pixels

IF cursor > numpsgin THEN 'Ou seja, esta' na linha de baixo, nos secretos
 
  'O Y para a linha de baixo
  y = 68

  'Esse e' calculado de um jeito pouco explicavel =)... o q se pode dizer e'
  'que ele pode dar quebrado (qq_coisa.5), mas depois e' multiplicado por 16
  CursorProQuadrinho! = (numpsgin - numsecp) / 2 + 1 + cursor - primeirosec
 
  ELSE
 
  'O Y para a linha de cima
  y = 52
 
  'Se for na linha de cima, sossegado: o cursor ja' e' aquele fornecido
  CursorProQuadrinho! = cursor

END IF

'Faz o servico propriamente dito. Pega a cor fornecida, coloca o pixel no
'ponto dado (que depende de CursorProQuadrinho) e desenha as linhas
DRAW "C" + STR$(cor) + "BM" + STR$(85 + (CursorProQuadrinho! - 1) * 16) + "," + STR$(y) + " D14 R14 U14 L1 ND13 L12 D13"

     'como era antes:
     'LINE (86 + (cursor - 1) * 16, 52)-(98 + (cursor - 1) * 16, 66), cor, B
     'LINE (85 + (cursor - 1) * 16, 52)-(85 + (cursor - 1) * 16, 66), cor
     'LINE (99 + (cursor - 1) * 16, 52)-(99 + (cursor - 1) * 16, 66), cor

END SUB

FUNCTION RD (min, max)
'Gera um # aleatorio em [min, max]

RD = INT(RND * (max - min + 1)) + min

END FUNCTION

FUNCTION Recomecar (tirarparedes, apglinhas)
'Nota: tirarparedes e' parametro booleano

linha = CSRLIN: coluna = POS(2)
COLOR corpadrao: opc$ = UmaTecla("Voltar ao comeáo", F, 23, F)
ApagarLinha 23
IF msgarr THEN msgarr = F

IF opc$ = "S" THEN
 IF arrastou THEN arrastou = F
 IF tirarparedes AND NOT (pratico OR meiopratico) THEN Paredes V, apglinhas
 CLS
 Recomecar = V: EXIT FUNCTION
END IF

LOCATE linha, coluna

END FUNCTION

SUB Sair (clsc, apglinhas)
'Nota: clsc e' parametro booleano

linha = CSRLIN: coluna = POS(1)
COLOR corpadrao: opc$ = UmaTecla("Sair", F, 23, F)
ApagarLinha 23

IF opc$ = "S" THEN
 IF faseexterna THEN CLOSE #1
 IF NOT pratico THEN
  IF clsc THEN CLScima ELSE IF meiopratico THEN CLS  ELSE Paredes V, apglinhas: CLS : COLOR corpadrao
 END IF
 END
END IF

LOCATE linha, coluna

END SUB

SUB SalvarFase
SHARED arqs$

7 OPEN arqs$ FOR OUTPUT AS #2
8 IF impossv THEN EXIT SUB

FOR l = 2 TO 17
 FOR c = 2 TO 39
  IF telaedt(l, c) = 0 OR telaedt(l, c) = 4 THEN seq$ = "" ELSE seq$ = LtSt$(telaedt(l, c))
  IF c < 39 THEN seq$ = seq$ + ","
  linha$ = linha$ + seq$
 NEXT
 PRINT #2, linha$
 linha$ = ""
NEXT

FOR controle = 1 TO 4
Sortear: parcIS(controle) = RD(0, 9)
 'checa
 FOR controle2 = 1 TO controle - 1
  IF parcIS(controle) = parcIS(controle2) THEN GOTO Sortear
 NEXT
 parcIS$(controle) = LtSt$(parcIS(controle))
NEXT

l1$ = LtSt$(posIS.l + parcIS(1) + 43)
d1l1$ = LEFT$(l1$, 1)
d2l1$ = RIGHT$(l1$, 1)
l2$ = LtSt$(posIS.l + parcIS(2) + 43)
d1l2$ = LEFT$(l2$, 1)
d2l2$ = RIGHT$(l2$, 1)
c1$ = LtSt$(posIS.c + parcIS(3) + 28)
d1c1$ = LEFT$(c1$, 1)
d2c1$ = RIGHT$(c1$, 1)
c2$ = LtSt$(posIS.c + parcIS(4) + 28)
d1c2$ = LEFT$(c2$, 1)
d2c2$ = RIGHT$(c2$, 1)

parcj1 = RD(0, 9)
DO: parcj2 = RD(0, 9): LOOP WHILE parcj2 = parcj1
parcj1$ = LtSt$(parcj1)
parcj2$ = LtSt$(parcj2)
 
j1 = jgdfs(0, 2) + parcj1 + 342
IF j1 > 999 THEN j1 = j1 - 1000
j1$ = LtSt$(j1)
d1j1$ = LEFT$(j1$, 1)
d2j1$ = MID$(j1$, 2, 1)
d3j1$ = RIGHT$(j1$, 1)
 
j2 = jgdfs(0, 2) + parcj2 + 537
IF j2 > 999 THEN j2 = j2 - 1000
j2$ = LtSt$(j2)
d1j2$ = LEFT$(j2$, 1)
d2j2$ = MID$(j2$, 2, 1)
d3j2$ = RIGHT$(j2$, 1)

FOR controle = 1 TO 6 STEP 2
 prot$(controle) = LtSt$(2 * RD(0, 4))
 prot$(controle + 1) = LtSt$(2 * RD(0, 4) + 1)
 IF proteger THEN SWAP prot$(controle), prot$(controle + 1)
NEXT

FOR controle = 1 TO 8
  r$(controle) = LtSt$(RD(0, 9))
NEXT

comeco$ = parcj2$ + prot$(1) + r$(1) + d2l2$ + d2c1$ + d1j2$ + parcIS$(4) + r$(2) + parcIS$(3) + d3j1$ + prot$(2) + d1c2$ + r$(3) + d1l1$ + d1j1$ + prot$(3)
fim$ = parcIS$(1) + d1c1$ + d1l2$ + r$(4) + d3j2$ + d2j2$ + prot$(4) + d2l1$ + r$(5) + r$(6) + prot$(5) + parcj1$ + d2c2$ + prot$(6) + r$(7) + d2j1$ + parcIS$(2) + r$(8)
PRINT #2, comeco$ + fim$
PRINT #2,
CLOSE #2

END SUB

SUB SalvarJogo

19 OPEN sv$ + PosSalvada$ FOR OUTPUT AS #3
20 IF impossv THEN EXIT SUB

FOR controle = 1 TO 8 STEP 2
 svs1$(controle) = MKI$(2 * RD(1000, 2000))
 svs1$(controle + 1) = MKI$(2 * RD(1000, 2000) + 1)
 IF arrastouAT THEN SWAP svs1$(controle), svs1$(controle + 1)
NEXT

parcp1 = RD(37, 93)
DO: parcp2 = RD(37, 93): LOOP WHILE parcp1 = parcp2
svs1$(9) = MKI$(pontosAT + parcp1 + 34)
svs1$(10) = MKI$(pontosAT + parcp2 + 85)
svs1$(11) = MKI$(parcp1)
svs1$(12) = MKI$(parcp2)

parcf1 = RD(838, 1389)
DO: parcf2 = RD(838, 1389): LOOP WHILE parcf1 = parcf2
svs1$(13) = MKI$(fase + parcf1 + 34)
svs1$(14) = MKI$(fase + parcf2 + 85)
svs1$(15) = MKI$(parcf1)
svs1$(16) = MKI$(parcf2)

parci1 = RD(572, 911)
DO: parci2 = RD(572, 911): LOOP WHILE parci1 = parci2
svs1$(17) = MKI$(IStotalAT + parci1 + 34)
svs1$(18) = MKI$(IStotalAT + parci2 + 85)
svs1$(19) = MKI$(parci1)
svs1$(20) = MKI$(parci2)

parcsr1 = RD(1297, 1563)
DO: parcr2 = RD(1297, 1563): LOOP WHILE parcr1 = parcr2
svs1$(21) = MKI$(personagem + parcr1 + 34)
svs1$(22) = MKI$(personagem + parcr2 + 85)
svs1$(23) = MKI$(parcr1)
svs1$(24) = MKI$(parcr2)

FOR controle = 1 TO qtfases
 parcj1 = RD(5268, 12307)
 DO: parcj2 = RD(5268, 12307): LOOP WHILE parcj1 = parcj2
 svs1$(21 + 4 * controle) = MKI$(jgdfs(controle, 1) + parcj1 + 34)
 svs1$(22 + 4 * controle) = MKI$(jgdfs(controle, 1) + parcj2 + 85)
 svs1$(23 + 4 * controle) = MKI$(parcj1)
 svs1$(24 + 4 * controle) = MKI$(parcj2)
NEXT

FOR controle = ujs + 1 TO tamsalvo / 2
  svs1$(controle) = MKI$(RD(10000, 20000))
NEXT

FOR controle = 1 TO tamsalvo / 2
 svs2$(controle, 1) = LEFT$(svs1$(controle), 1)
 svs2$(controle, 2) = RIGHT$(svs1$(controle), 1)
NEXT

seq$ = SPACE$(tamsalvo)
FOR controle = 0 TO tamsalvo - 1
  '        da' a posicao em que se deve colocar a sequencia
  '                                /^\
  '                                 |
  '          /----------------------------------------\
  MID$(seq$, ordem(controle \ 2 + 1, Par(controle) + 2)) = svs2$(controle \ 2 + 1, Par(controle) + 2)
NEXT
PRINT #3, seq$;
CLOSE #3

21

END SUB

FUNCTION SetaIlegal

FOR c = 2 TO 39
 l = 2
 GOSUB Checar
 l = 18
 GOSUB Checar
NEXT

FOR l = 2 TO 17
 c = 2
 GOSUB Checar
 c = 40
 GOSUB Checar
NEXT

EXIT FUNCTION

Checar:
 naochec = F: pcsl = F: pcsc = F
 obj = telaedt(l, c)
 SELECT CASE obj
  CASE 5, 6: pcsl = V
  CASE 7, 8: pcsc = V
  CASE 10
  CASE ELSE: naochec = V
 END SELECT
 IF NOT naochec THEN
  obstpardl = (obj = 10 AND (telaedt(l - 1, c) = 5 OR telaedt(l - 1, c) = 6))
  obstpardc = (obj = 10 AND (telaedt(l, c - 1) = 7 OR telaedt(l, c - 1) = 8))
  linear = ObstLin(telaedt(l + pcsl, c + pcsc), obj)
  IF linear OR obstpardl OR obstpardc THEN
   IF obstpardl THEN l = l - 1: obj = telaedt(l, c) ELSE IF obstpardc THEN c = c - 1: obj = telaedt(l, c)
   FOR controle = 1 TO 6
    IF mudacor THEN cor = cor(obj) ELSE cor = cor(10)
    COLOR cor
    LOCATE l, c: PRINT desenho(obj);
    Tempo .15
    mudacor = NOT mudacor
   NEXT
   IF csAG.l = l AND csAG.c = c THEN cor = corcursor ELSE cor = cor(obj)
   COLOR cor
   LOCATE l, c: PRINT desenho(obj);
   SetaIlegal = V: EXIT FUNCTION
  END IF
 END IF
RETURN

END FUNCTION

SUB Tempo (vt!)

tp! = TIMER
IF NOT pratico THEN
  IF meiopratico THEN vt! = .00001
  DO: LOOP UNTIL TIMER - tp! >= vt!
END IF

END SUB

FUNCTION TerminouFase (direcao$, testandofase)

SELECT CASE direcao$
 CASE cima$: pl = -1: setaref = 5
 CASE baixo$: pl = 1: setaref = 6
 CASE esquerda$: pc = -1: setaref = 7
 CASE direita$: pc = 1: setaref = 8
END SELECT

DO

 IF ObstLin(telajg(posAG.l + pl, posAG.c + pc), setaref) THEN EXIT FUNCTION
 posAN = posAG
 posAG.l = posAG.l + pl: posAG.c = posAG.c + pc
 obj = telajg(posAN.l, posAN.c)

 IF NOT jaandou THEN
  ImpJogadas 1
  IF pontos = 0 THEN
   IF NOT arrastou THEN arrastou = V
   IF NOT msgarr THEN SOUND 50, 4: PRTcent 23, "Voce esta se arrastando!": msgarr = V
   ELSE ImpPontos -1
  END IF
  jaandou = V
 END IF
 COLOR cor(obj)
 LOCATE posAN.l, posAN.c: PRINT desenho(obj);
 COLOR cor(1)
 LOCATE posAG.l, posAG.c: PRINT desenho(1);
 IF msgarr THEN t! = .06 ELSE t! = .001
 Tempo t!

 SELECT CASE telajg(posAG.l, posAG.c)
  CASE 2: TerminouFase = V: EXIT FUNCTION
  CASE 3
   telajg(posAG.l, posAG.c) = 0
   ImpPontos 100
   IF msgarr THEN ApagarLinha 23: msgarr = F
   PLAY som$(3)
  CASE 4
   telajg(posAG.l, posAG.c) = 0
   PLAY som$(4)
   IF NOT testandofase THEN
    IStotal = IStotal + 1
    COLOR corpadrao: MsgTempo 23, "Vocà achou um item secreto!"
    IF msgarr THEN msgarr = F
   END IF
 END SELECT

LOOP

END FUNCTION

FUNCTION UltimoPsg

u = numpsgin
IF LinhaDeBaixo THEN u = u + numsecp
UltimoPsg = u

END FUNCTION

FUNCTION UmaTecla$ (pergunta$, printi, linha, sesalvo)
'Nota: printi e sesalvo sao parametros booleanos

IF sesalvo THEN sn$ = " 1, 2, 3, 4 ou 5" ELSE sn$ = " (S/N)"
seq$ = pergunta$ + sn$ + "? "
IF linha = 0 THEN PRINT seq$;  ELSE PRTcent linha, seq$
DO
 I$ = UCASE$(INKEY$)
 IF sesalvo THEN cond = ((VAL(I$) >= 1 AND VAL(I$) <= 5) OR I$ = esc$) ELSE cond = (I$ = "S" OR I$ = "N")
LOOP UNTIL cond
IF I$ <> esc$ AND printi THEN PRINT I$;
UmaTecla$ = I$

END FUNCTION

SUB ZerarPos

posIS.l = 0: posIS.c = 0
posTL.l = 0: posTL.c = 0
posIN.l = 0: posIN.c = 0

END SUB

SUB ZerouJogo (fimdearquivo)
'Nota: parametro booleano

IF meiopratico THEN CLS  ELSE Paredes V, 1
CLS : COLOR corpadrao

'IF fimdearquivo THEN
 IF arrastou THEN vez$ = "uma ou mais vezes..." ELSE nao$ = "nao ": vez$ = "nenhuma vez!"
 COLOR cor(3): PRTmov 1, 0, desenho(3) + " - vocà terminou com" + STR$(pontos) + " ponto(s)"
 COLOR cor(4): PRTmov 2, 0, desenho(4) + " - pegou" + STR$(IStotal) + " item(ns) secreto(s)"
 COLOR cor(1): PRTmov 3, 0, desenho(1) + " - e " + nao$ + "se arrastou " + vez$
 Tempo .5

 COLOR corpadrao
 PRTmov 5, 0, "Suas jogadas nas fases:"

'          7, com 30 fases
'              /^\
'               |
'               |
'        /-----/^\-----\
 linha = 14.5 - fase / 4: LOCATE linha
 coluna = 8
 FOR controle = 1 TO fase
  IF controle > fase \ 2 AND coluna = 8 THEN LOCATE linha: coluna = 25
  Tempo .1
  fas$ = LtSt(controle)
  IF controle < 10 THEN fas$ = " " + fas$
  LOCATE , coluna: PRINT fas$; ": "; LtSt$(jgdfs(controle, 1)); "/"; LtSt$(jgdfs(controle, 2))
 NEXT
 Tempo 1

' ELSE
  'Fazer o final do jogo aqui!
'END IF

COLOR corhist: PRTmov 24, 0, "Pressione qualquer tecla!"
LimpaBuffer
Pausa
CLScima

IF arrastou THEN arrastou = F
IF msgarr THEN msgarr = F

END SUB

