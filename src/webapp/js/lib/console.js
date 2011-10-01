(function() {
	function gerarCallback(nivelLog) {
		return function(texto) {
			escrever(nivelLog, texto);
		};
	}

	function escrever(nivel, texto) {
		var con = $('ul#console');
		con.children().length > 5 && con.empty();
		con.append($('<li>').text('[' + nivel + '] ' + texto));
	}

	console || (console = {
		debug: gerarCallback('DEBUG'),
		info: gerarCallback('INFO'),
		error: gerarCallback('ERROR'),
	});

})();
