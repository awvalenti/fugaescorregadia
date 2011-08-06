(function() {
	function escrever(nivel, texto) {
		$('ul#console').append($('<li>').text('[' + nivel + '] ' + texto));
	}

	con = {
		debug: function(texto) {
			escrever('DEBUG', texto);
		}
	};
})();
