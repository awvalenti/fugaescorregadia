function aplicarCssDinamico(seletor) {
	var cssDinamico = $(seletor).text();

	var regExp = /`(.*?)`/m;
	var match;
	while ((match = cssDinamico.match(regExp)) != null) {
		var codigoJs = match[1];
		cssDinamico = cssDinamico.replace(regExp, eval(codigoJs));
	}

	$('style').remove();

	// TODO escapar
	$('head').append('<style>' + cssDinamico + '</style>');
}
