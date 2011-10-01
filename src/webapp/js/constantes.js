var Constantes = {
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

var Comando = new Enum('ESQUERDA', 'CIMA', 'DIREITA', 'BAIXO', 'ENTER', 'ESC');

var Evento = new Enum('CONTINUAR_ANDANDO', 'BLOQUEAR', 'PEGAR_ITEM', 'PASSAR_DE_FASE', 'ALTERNAR_LUZ');

var Elemento = {
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

(function() {
	var mapaDeNomeParaObjeto = {};

	for (var nomeElemento in Elemento) {
		var elemento = Elemento[nomeElemento];
		elemento.nome = nomeElemento;
		elemento.toString = function() { return this.nome; };
		mapaDeNomeParaObjeto[elemento.caractere] = elemento;
	}

	Elemento.mapaDeNomeParaObjeto = mapaDeNomeParaObjeto;
})();

var Direcao = {
	ESQUERDA: Posicao(0, -1),
	CIMA: Posicao(-1, 0),
	DIREITA: Posicao(0, +1),
	BAIXO: Posicao(+1, 0)
};
