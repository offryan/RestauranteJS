;(function () {

	'use strict';

	// No computador o botão do menu já aparece no topo: o flutuante entra
	// quando o menu sai da tela. No celular ele fica sempre visível.
	var atualizar = function () {
		var celular = window.matchMedia('(max-width: 768px)').matches;
		var passouDoMenu = $(window).scrollTop() > $('.gtco-nav').outerHeight();
		$('.js-reserva-flutuante').toggleClass('visivel', celular || passouDoMenu);
	};

	$(function () {
		$('html').addClass('reserva-js');
		$(window).on('scroll resize', atualizar);
		atualizar();
	});

}());
