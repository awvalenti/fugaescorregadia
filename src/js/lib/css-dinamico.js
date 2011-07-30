function aplicarCssDinamico(seletor) {
	codigo = $(seletor).text();

	var regExp = /`(.*?)`/m;
	var match;
	while ((match = codigo.match(regExp)) != null) {
		var grupo1 = match[1];
		codigo = codigo.replace(regExp, eval(grupo1));
	}

	$('style').remove();

	// TODO escapar
	$('head').append('<style>' + codigo + '</style>');
}
