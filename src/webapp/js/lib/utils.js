function gerarCallback(objeto, funcao) {
	return function() {
		return funcao.apply(objeto, arguments);
	};
}
