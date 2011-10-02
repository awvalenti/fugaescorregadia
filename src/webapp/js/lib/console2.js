(function() {
	function gerarCallbackEscrever(nivelLog) {
		return function() {
			escrever(nivelLog, arguments);
		};
	}

	function escrever(nivel, texto) {
		var ulConsole = $('ul#console');
		ulConsole.children().length > 10 && ulConsole.empty();

		var textoCorrido = '';
		for (var i = 0; i < texto.length; ++i) {
			textoCorrido += texto[i] + ' ';
		}

		ulConsole.append($('<li>').text('[' + nivel + '] ' + textoCorrido));
	}

	console2 = {
		debug: gerarCallbackEscrever('DEBUG'),
		info: gerarCallbackEscrever('INFO'),
		error: gerarCallbackEscrever('ERROR'),
	};

})();
