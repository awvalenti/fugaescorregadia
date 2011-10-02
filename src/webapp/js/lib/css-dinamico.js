function aplicarCssDinamico(seletor) {
	var cssDinamico = $(seletor).html();

	var regExp = /`(.*?)`/m;
	var match;
	while ((match = cssDinamico.match(regExp)) != null) {
		var codigoJs = match[1];
		cssDinamico = cssDinamico.replace(regExp, eval(codigoJs));
	}

	$('head style').remove();

	$('head').append('<style>' + cssDinamico + '</style>');
}
