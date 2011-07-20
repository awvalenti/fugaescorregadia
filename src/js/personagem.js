function Personagem() {
}

Personagem.prototype.setPosicaoInicial = function(linha, coluna) {
	this.posicao = new Posicao(linha, coluna);
	$('[elemento="PERSONAGEM"]')
		.css({
			top: this.posicao.linha * Constantes.ALTURA_CELULA + 'px',
			left: this.posicao.coluna * Constantes.LARGURA_CELULA + 'px'
		});
};

Personagem.prototype.andar = function(direcao, jogo) {
	var filaEventos = [];
	
	for (;;) {
	
		var eventoAoTentarPassar = jogo.tabuleiro.get(this.posicao.somar(direcao)).aoTentarPassar(direcao);
		
		if (eventoAoTentarPassar == Evento.BLOQUEAR) {
			break;
		}
		
		// Atualiza posicao
		this.posicao = this.posicao.somar(direcao);
		
		// Prepara fila de eventos para processar
		filaEventos.push({ qual: eventoAoTentarPassar, posicao: this.posicao });
		
		$('[elemento="PERSONAGEM"]')
			.animate({
				top: this.posicao.linha * Constantes.ALTURA_CELULA + 'px',
				left: this.posicao.coluna * Constantes.LARGURA_CELULA + 'px'
			}, Constantes.TEMPO_UM_PASSO, 'linear', function() {
				var evento = filaEventos.shift(); 
				
				switch (evento.qual) {
				case Evento.PEGAR_ITEM:
					jogo.subirPontuacaoPorItem();
					jogo.tabuleiro.set(evento.posicao, Elemento.NADA);
					break;
				case Evento.PASSAR_DE_FASE:
					alert('Passou!');
					jogo.passarDeFase();
				}
			});
		
		if (jogo.tabuleiro.get(this.posicao).emPassagem() == Evento.BLOQUEAR) {
			break;
		}
	}
};
