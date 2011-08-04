$(function() {
	Tela = {
		numLinhas: 16,
		numColunas: 38,

		// Valores iniciais. Serao modificados dinamicamente.
		larguraCelula: 30,
		alturaCelula: 30
	};

	var ModoDebug = {
		rejeitarFaseTamanhoIncorreto: false
	};

	OpcoesGlobais = ModoDebug;
	new Jogo();
});
