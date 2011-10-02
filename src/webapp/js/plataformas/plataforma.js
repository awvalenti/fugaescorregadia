(function() {
	Plataforma = {
		ios: {
			aoIniciar: function() {
				$('head')
						.append(
								'<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />')
						.append('<meta name="apple-mobile-web-app-capable" content="yes" />');

				$('body').append('<p style="height: 2000px; visibility: hidden">asdf</p>');

				Constantes.SENSIBILIDADE_MOVIMENTO = 30;
			},
			aoRedimensionar: function() {
				setTimeout(function() {
					window.scrollTo(0, 0);
				}, 0);
			}
		},

		pc: {
			aoIniciar: $.noop,
			aoRedimensionar: $.noop
		}
	};

	Plataforma = Plataforma.ios;

})();
