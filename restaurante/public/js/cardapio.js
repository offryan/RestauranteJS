;(function () {

	'use strict';

	// Abre a foto ampliada, navegando só entre os pratos visíveis
	var ativarGaleria = function () {
		$('.cardapio-popup').off('click.magnificPopup');
		$('.cardapio-item:not([hidden]) .cardapio-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true,
				duration: 300,
				easing: 'ease-in-out'
			}
		});
	};

	var filtrar = function (categoria) {
		var $botao = $('.cardapio-filtro[data-categoria="' + categoria + '"]');
		if (!$botao.length) {
			categoria = 'todos';
			$botao = $('.cardapio-filtro[data-categoria="todos"]');
		}

		$('.cardapio-filtro').removeClass('active').attr('aria-pressed', 'false');
		$botao.addClass('active').attr('aria-pressed', 'true');

		$('.cardapio-item').each(function () {
			var mostrar = categoria === 'todos' || $(this).data('categoria') === categoria;
			$(this).prop('hidden', !mostrar);
		});

		ativarGaleria();
	};

	$(function () {
		$('.cardapio-filtro').on('click', function () {
			var categoria = $(this).data('categoria');
			filtrar(categoria);
			// Guarda a categoria no endereço, para o link poder ser compartilhado
			history.replaceState(null, '', categoria === 'todos' ? location.pathname : '#' + categoria);
		});

		var filtrarPeloEndereco = function () {
			filtrar(location.hash.replace('#', '') || 'todos');
		};
		$(window).on('hashchange', filtrarPeloEndereco);
		filtrarPeloEndereco();
	});

}());
