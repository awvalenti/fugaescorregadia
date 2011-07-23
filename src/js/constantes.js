Constantes = {
	LARGURA_CELULA: 30,
	ALTURA_CELULA: 30,
	
	NUM_LINHAS: 12,
	NUM_COLUNAS: 16,
	
	TEMPO_UM_PASSO: 40
};

//////////////////////////////////////

function Enum() {
	// for (var i in arguments) nao funciona no IE
	for (var i = 0; i < arguments.length; ++i) {
		this[arguments[i]] = {
			ordinal: i,
			name: arguments[i],
			toString: function() { return this.name; }
		};
	}
}

Evento = new Enum('CONTINUAR_ANDANDO', 'BLOQUEAR', 'PEGAR_ITEM', 'PASSAR_DE_FASE', 'ALTERNAR_LUZ');

Elemento = {
	NADA: {
		caractere: '_',
		aoTentarPassar: function() { return Evento.CONTINUAR_ANDANDO; },
		emPassagem: function() { return Evento.CONTINUAR_ANDANDO; }
	},
	OBSTACULO: {
		caractere: 'o',
		aoTentarPassar: function() { return Evento.BLOQUEAR; }
	},
	SETA_ESQUERDA: {
		caractere: '[',
		aoTentarPassar: function(direcao) { return direcao == Direcao.ESQUERDA ? Evento.CONTINUAR_ANDANDO : Evento.BLOQUEAR; },
		emPassagem: function() { return Evento.CONTINUAR_ANDANDO; }
	},
	SETA_CIMA: {
		caractere: '^',
		aoTentarPassar: function(direcao) { return direcao == Direcao.CIMA ? Evento.CONTINUAR_ANDANDO : Evento.BLOQUEAR; },
		emPassagem: function() { return Evento.CONTINUAR_ANDANDO; }
	},
	SETA_DIREITA: {
		caractere: ']',
		aoTentarPassar: function(direcao) { return direcao == Direcao.DIREITA ? Evento.CONTINUAR_ANDANDO : Evento.BLOQUEAR; },
		emPassagem: function() { return Evento.CONTINUAR_ANDANDO; }
	},
	SETA_BAIXO: {
		caractere: 'v',
		aoTentarPassar: function(direcao) { return direcao == Direcao.BAIXO ? Evento.CONTINUAR_ANDANDO : Evento.BLOQUEAR; },
		emPassagem: function() { return Evento.CONTINUAR_ANDANDO; }
	},
	COLA: {
		caractere: 'c',
		aoTentarPassar: function() { return Evento.CONTINUAR_ANDANDO; },
		emPassagem: function() { return Evento.BLOQUEAR; }
	},
	ITEM: {
		caractere: 'i',
		aoTentarPassar: function() { return Evento.PEGAR_ITEM; },
		emPassagem: function() { return Evento.CONTINUAR_ANDANDO; }
	},
	PERSONAGEM: {
		caractere: 'p',
		sohUmPorFase: true
	},
	SAIDA: {
		caractere: 's',
		aoTentarPassar: function() { return Evento.PASSAR_DE_FASE; },
		emPassagem: function() { return Evento.BLOQUEAR; },
		sohUmPorFase: true
	},
	INTERRUPTOR: {
		caractere: 'x',
		aoTentarPassar: function() { return Evento.CONTINUAR_ANDANDO; },
		emPassagem: function() { return Evento.ALTERNAR_LUZ; }
	}
};

MAPA_CONSTRUCAO_FASE = {};

(function() {
	for (var nomeElemento in Elemento) {
		var elemento = Elemento[nomeElemento];
		elemento.nome = nomeElemento;
		elemento.toString = function() { return this.nome; };
		MAPA_CONSTRUCAO_FASE[elemento.caractere] = elemento;
	}
})();

Direcao = {
	ESQUERDA: new Posicao(0, -1),
	CIMA: new Posicao(-1, 0),
	DIREITA: new Posicao(0, +1),
	BAIXO: new Posicao(+1, 0)
};
