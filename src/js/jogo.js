function Jogo() {
	this.personagem = new Personagem(this.tratadorEventos());
	this.setPontos(0);
	this.setFase(0);
};

function gerarCallback(objeto, funcao) {
	return function() {
		funcao.apply(objeto, arguments);
	};
};

Jogo.prototype.tratadorEventos = function() {
	var jogo = this;
	return {
		PEGAR_ITEM: function(posicao) {
			jogo.subirPontuacaoPorItem();
			jogo.tabuleiro.set(posicao, Elemento.NADA);
		},
		PASSAR_DE_FASE: function(posicao) {
			jogo.passarDeFase();
		}
	};
};

Jogo.prototype.passarDeFase = function() {
	alert('Passou!');
	this.setFase(this.fase + 1);
};

Jogo.prototype.setFase = function(fase) {
	this.fase = fase;
	if (fase >= $('.fase').size()) {
		alert('Terminou!');
		$('body').fadeOut(1500);
	} else {
		this.tabuleiro = new Tabuleiro(Constantes.NUM_LINHAS, Constantes.NUM_COLUNAS, this.fase, this.personagem,
				gerarCallback(this, this.iniciar));
	}
};

Jogo.prototype.iniciar = function() {
	$(window).focus();
	this.escutarComandos();
};

Jogo.prototype.escutarComandos = function() {
	$(document).unbind().keydown(gerarCallback(this, this.tratarTeclas));
	var jogo = this;
	$('button').unbind().click(function() {
		jogo.executarComando(Comando[$(this).val()]);
	});

};

Jogo.prototype.tratarTeclas = function(e) {
	var teclasComandos = {
		37: Comando.ESQUERDA,
		38: Comando.CIMA,
		39: Comando.DIREITA,
		40: Comando.BAIXO
	};

	teclasComandos[e.which] && this.executarComando(teclasComandos[e.which]);
};

Jogo.prototype.executarComando = function(comando) {
	var direcaoCoresspondente = Direcao[comando];
	this.personagem.andar(direcaoCoresspondente, this);
};

Jogo.prototype.subirPontuacaoPorItem = function() {
	this.setPontos(this.pontos + 100);
};

Jogo.prototype.setPontos = function(pontos) {
	this.pontos = pontos;
	$('#pontos').text(pontos + ' ponto' + (pontos > 1 ? 's' : ''));
};
