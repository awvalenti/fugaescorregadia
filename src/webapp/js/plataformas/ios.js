// Codigo especifico para iPhone / iPod Touch / iPad
$(function() {
	$('head')
			.append(
					'<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />')
			.append('<meta name="apple-mobile-web-app-capable" content="yes" />');

	$('body').append('<p style="height: 300px; visibility: hidden">asdf</p>');
	setTimeout(function() {
		window.scrollTo(0,0);
	}, 500);

	Constantes.SENSIBILIDADE_MOVIMENTO = 30;
});
